import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About Lovable Benchmarks</h1>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">What is Lovable Benchmarks?</h2>
            <p className="mb-4">
              Lovable Benchmarks is an innovative platform designed to evaluate and improve AI systems. 
              Our goal is to provide a comprehensive, user-friendly tool for benchmarking AI performance 
              across various dimensions, helping developers and researchers create more effective and 
              ethical AI solutions.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Create custom scenarios to test AI systems</li>
              <li>Define specific evaluation criteria and reviewers</li>
              <li>Run benchmarks to assess AI performance</li>
              <li>Analyze results and generate insights</li>
              <li>Iterate and improve AI systems based on benchmark outcomes</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Future Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Advanced visualization tools for benchmark results</li>
              <li>Integration with popular AI development frameworks</li>
              <li>Collaborative benchmarking for team projects</li>
              <li>Customizable reporting and export options</li>
              <li>API access for automated benchmarking processes</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default About;