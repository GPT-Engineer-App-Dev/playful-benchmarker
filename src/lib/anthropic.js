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
        content: `You are a human user interacting with a GPT Engineer system. Respond naturally with specific goals and limited technical knowledge. Either:

1. Make a request using <lov-chat-request>Your request here</lov-chat-request>
2. End the scenario with <lov-scenario-finished/>

Choose based on how a real user would interact. Do not explain your choices or include text outside these tags.`
      },
      {
        role: "user",
        content: basePrompt
      },
      ...additionalMessages
    ];

    console.log('LLM Request:', JSON.stringify({ messages, temperature }, null, 2));

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
      console.error(`LLM call failed. Status: ${response.status}, Error: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('LLM Response:', JSON.stringify(data, null, 2));

    const content = data.content[0].text;
    return content;
  } catch (error) {
    console.error('Error calling Supabase LLM:', error);
    throw error;
  }
}