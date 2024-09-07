import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useBenchmarkScenarios } from '../integrations/supabase';

const WelcomeSection = () => {
  const navigate = useNavigate();
  const { data: scenarios, isLoading, error } = useBenchmarkScenarios();

  const handleStartBenchmark = () => {
    navigate('/start-benchmark');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Lovable Benchmarks</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Evaluate and improve your AI systems with our comprehensive benchmarking tools.
      </p>
      {isLoading ? (
        <p>Loading benchmarks...</p>
      ) : error ? (
        <p className="text-red-500">
          Error fetching benchmarks: {error.message || 'An unexpected error occurred. Please check your network connection and try again. If the problem persists, contact support.'}
        </p>
      ) : scenarios && scenarios.length > 0 ? (
        <Button onClick={handleStartBenchmark} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Start Benchmark
        </Button>
      ) : (
        <p>No benchmarks available. Please create a benchmark scenario first.</p>
      )}
    </div>
  );
};

export default WelcomeSection;