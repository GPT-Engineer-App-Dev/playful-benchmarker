import { supabase } from '../integrations/supabase';

export async function callSupabaseLLM(basePrompt, additionalMessages = [], temperature = 0.7) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('User not authenticated');
    }

    if (!basePrompt) {
      throw new Error('Base prompt is undefined or empty');
    }

    const messages = [
      {
        role: "system",
        content: `You are simulating a human user interacting with a GPT Engineer system. Respond naturally as if you have specific goals but limited technical knowledge. Your responses should reflect a user's perspective and be one of the following:

1. Make a request using <lov-chat-request>Your request here</lov-chat-request>
   Use this to ask for changes, additions, or information about the project. Be specific but avoid technical jargon.

2. End the scenario with <lov-scenario-finished/>
   Use this when you feel the interaction is complete or you have no more requests.

Choose based on how a real user would interact in this situation. Avoid explanations or text outside these tags. Keep responses concise and focused on the task at hand, as if you're a user with a clear goal but not necessarily technical expertise.`
      },
      {
        role: "user",
        content: basePrompt
      },
      ...additionalMessages
    ];

    const validMessages = messages.every(msg => msg.role && msg.content);
    if (!validMessages) {
      throw new Error('Invalid message format: All messages must have role and content fields');
    }

    const response = await fetch('https://jyltskwmiwqthebrpzxt.supabase.co/functions/v1/llm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5bHRza3dtaXdxdGhlYnJwenh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxNTA2NjIsImV4cCI6MjAzNzcyNjY2Mn0.a1y6NavG5JxoGJCNrAckAKMvUDaXAmd2Ny0vMvz-7Ng'
      },
      body: JSON.stringify({ messages, temperature })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    const content = data.content[0].text;
    return content;
  } catch (error) {
    throw error;
  }
}