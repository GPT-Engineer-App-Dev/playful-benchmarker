import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../integrations/supabase';
import { supabase, useUpdateRun, useAddResult } from '../integrations/supabase';
import { toast } from 'sonner';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { callOpenAILLM } from '../lib/anthropic';
import { sendChatMessage } from '../lib/userImpersonation';

const useBenchmarkRunner = (systemVersion) => {
  const [isRunning, setIsRunning] = useState(false);
  const updateRun = useUpdateRun();
  const addResult = useAddResult();

  const handleSingleIteration = useCallback(async (gptEngineerTestToken) => {
    const { data: runs, error: runsError } = await supabase
      .from('runs')
      .select('*')
      .or('state.eq.paused,state.eq.running')
      .order('created_at', { ascending: true })
      .limit(1);

    if (runsError) {
      console.error("Error fetching runs:", runsError);
      return;
    }

    if (!runs || runs.length === 0) {
      console.log("No runs available");
      return;
    }

    const availableRun = runs[0];

    // If the run is paused, try to start it
    if (availableRun.state === "paused") {
      const { data: runStarted, error: startError } = await supabase
        .rpc('start_paused_run', { run_id: availableRun.id });

      if (startError) {
        console.error("Error starting run:", startError);
        return;
      }

      if (!runStarted) {
        console.log("Failed to start run (it may no longer be in 'paused' state):", availableRun.id);
        return;
      }
    }

    // At this point, the run should be in 'running' state

    const startTime = Date.now();

    try {
      // Fetch project messages from Firestore
      const messagesRef = collection(db, `project/${availableRun.project_id}/trajectory`);
      const q = query(messagesRef, orderBy("timestamp", "asc"));
      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map(doc => ({
        role: doc.data().sender === "human" ? "assistant" : "user",
        content: doc.data().content
      }));

      // Call OpenAI to get next user impersonation action
      const nextAction = await callOpenAILLM(messages, 'gpt-4o', availableRun.llm_temperature);

      if (nextAction.includes("<lov-scenario-finished/>")) {
        await updateRun.mutateAsync({
          id: availableRun.id,
          state: 'completed',
        });
        toast.success("Scenario completed successfully");
        return;
      }

      const chatRequestMatch = nextAction.match(/<lov-chat-request>([\s\S]*?)<\/lov-chat-request>/);
      if (!chatRequestMatch) {
        throw new Error("Unexpected assistant message format");
      }

      const chatRequest = chatRequestMatch[1].trim();

      // Call the chat endpoint
      const chatResponse = await sendChatMessage(availableRun.project_id, chatRequest, systemVersion, gptEngineerTestToken);

      // Add result
      await addResult.mutateAsync({
        run_id: availableRun.id,
        reviewer_id: null,
        result: {
          type: 'chat_message_sent',
          data: chatResponse,
        },
      });

      toast.success("Iteration completed successfully");
    } catch (error) {
      console.error("Error during iteration:", error);
      toast.error(`Iteration failed: ${error.message}`);
    } finally {
      const endTime = Date.now();
      const timeUsage = Math.round((endTime - startTime) / 1000); // Convert to seconds

      // Update the total_time_usage in Supabase
      const { data, error } = await supabase
        .rpc('update_run_time_usage', { 
          run_id: availableRun.id, 
          time_increment: timeUsage 
        });

      if (error) console.error('Error updating time usage:', error);

      // Check if the run has timed out
      const { data: runData } = await supabase
        .from('runs')
        .select('state')
        .eq('id', availableRun.id)
        .single();

      if (runData.state !== 'timed_out') {
        // Update run state back to 'paused' only if it hasn't timed out
        await updateRun.mutateAsync({
          id: availableRun.id,
          state: 'paused',
        });
      }
    }
  }, [updateRun, addResult, systemVersion]);

  const startRunner = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stopRunner = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(async () => {
        const { data: userSecrets, error } = await supabase
          .from('user_secrets')
          .select('secret')
          .limit(1);

        if (error) {
          console.error("Error fetching user secrets:", error);
          setIsRunning(false);
          toast.error("Failed to fetch user secrets. Stopping runner.");
          return;
        }

        if (userSecrets && userSecrets.length > 0) {
          const secrets = JSON.parse(userSecrets[0].secret);
          const gptEngineerTestToken = secrets.GPT_ENGINEER_TEST_TOKEN;
          if (gptEngineerTestToken) {
            await handleSingleIteration(gptEngineerTestToken);
          } else {
            console.error("GPT Engineer test token not found in user secrets");
            setIsRunning(false);
            toast.error("GPT Engineer test token not found. Please set it up in your secrets.");
          }
        } else {
          console.error("No user secrets found");
          setIsRunning(false);
          toast.error("No user secrets found. Please set up your secrets.");
        }
      }, 5000); // Run every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, handleSingleIteration]);

  return { isRunning, startRunner, stopRunner };
};

export default useBenchmarkRunner;
