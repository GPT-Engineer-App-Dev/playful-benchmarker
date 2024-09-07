import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useAddRun, useAddResult, useUpdateRun, useUserSecrets } from "../integrations/supabase";
import { supabase } from "../integrations/supabase";
import { impersonateUser } from "../lib/userImpersonation";

const useBenchmarkLogic = (selectedScenarios, scenarios, systemVersion, session) => {
  const [isRunning, setIsRunning] = useState(false);
  const addRun = useAddRun();
  const addResult = useAddResult();
  const updateRun = useUpdateRun();
  const { data: userSecrets, isLoading: isLoadingSecrets, error: secretsError } = useUserSecrets();

  const handleStartBenchmark = useCallback(async () => {
    if (selectedScenarios.length === 0) {
      toast.error("Please select at least one scenario to run.");
      return;
    }

    if (isLoadingSecrets) {
      toast.error("Loading user secrets. Please try again in a moment.");
      return;
    }

    if (secretsError) {
      toast.error(`Failed to fetch user secrets: ${secretsError.message}. 
        User secrets are required to authenticate with external services for benchmarking.
        Please try the following:
        1. Check your internet connection.
        2. Ensure you have set up your secrets on the Secrets page.
        3. If you haven't set up secrets yet, go to the Secrets page by clicking on your profile and selecting "Secrets".
        4. If you've recently changed your secrets, try logging out and logging back in.
        5. Clear your browser cache and try again.
        If the problem persists, please contact our support team at support@lovablebenchmarks.com with the error details.`);
      return;
    }

    if (!userSecrets || userSecrets.length === 0) {
      toast.error(`No user secrets found. User secrets are necessary to run benchmarks.
        Please set up your GPT Engineer test token in the Secrets page:
        1. Click on your profile in the top right corner.
        2. Select "Secrets" from the dropdown menu.
        3. Enter your GPT Engineer test token in the designated field.
        4. Save your changes.
        After setting up your secrets, return to this page and try starting the benchmark again.`);
      return;
    }

    const secrets = JSON.parse(userSecrets[0].secret);
    const gptEngineerTestToken = secrets.GPT_ENGINEER_TEST_TOKEN;

    if (!gptEngineerTestToken) {
      toast.error(`GPT Engineer test token not found in your secrets.
        This token is crucial for authenticating with the GPT Engineer service.
        To add it:
        1. Go to the Secrets page (Profile > Secrets).
        2. Enter your GPT Engineer test token in the "GPT_ENGINEER_TEST_TOKEN" field.
        3. Save your changes.
        If you don't have a GPT Engineer test token, please contact our support team for assistance.`);
      return;
    }

    setIsRunning(true);

    try {
      for (const scenarioId of selectedScenarios) {
        const scenario = scenarios.find((s) => s.id === scenarioId);
        
        // Call initial user impersonation function
        const { projectId, projectLink } = await impersonateUser(scenario.prompt, systemVersion, scenario.llm_temperature);

        const { data: newRun, error: createRunError } = await supabase
          .from('runs')
          .insert({
            scenario_id: scenarioId,
            system_version: systemVersion,
            project_id: projectId,
            user_id: session.user.id,
            link: projectLink,
            state: 'paused'
          })
          .select()
          .single();

        if (createRunError) throw new Error(`Failed to create run: ${createRunError.message}`);

        toast.success(`Benchmark created and paused for scenario: ${scenario.name}`);
      }

      toast.success("All benchmarks started successfully!");
    } catch (error) {
      console.error("Error starting benchmark:", error);
      toast.error("An error occurred while starting the benchmark. Please try again.");
      setIsRunning(false);
    }
  }, [selectedScenarios, scenarios, systemVersion, session, addRun, addResult, userSecrets, isLoadingSecrets, secretsError]);

  return {
    isRunning,
    handleStartBenchmark
  };
};

export default useBenchmarkLogic;