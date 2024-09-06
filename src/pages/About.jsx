import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">About Lovable Benchmarks</h1>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">What is Lovable Benchmarks?</h2>
            <p className="mb-4">
              Lovable Benchmarks is an innovative platform designed to evaluate and improve AI systems through comprehensive, scenario-based testing. Our goal is to push the boundaries of AI capabilities and ensure that AI systems are not just functional, but truly beneficial and aligned with human values.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">How it Works</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Create diverse, challenging scenarios that test various aspects of AI systems.</li>
              <li>Define specific evaluation criteria for each scenario.</li>
              <li>Run AI systems through these scenarios and collect performance data.</li>
              <li>Analyze results to identify strengths, weaknesses, and areas for improvement.</li>
              <li>Use insights to refine AI systems and development processes.</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Key Performance Dimensions</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Task Completion: Ability to successfully accomplish given objectives.</li>
              <li>Accuracy: Precision and correctness of outputs and decisions.</li>
              <li>Efficiency: Speed and resource utilization in problem-solving.</li>
              <li>Adaptability: Flexibility in handling diverse or unexpected situations.</li>
              <li>Creativity: Generation of novel and valuable ideas or solutions.</li>
              <li>Ethical Alignment: Adherence to moral principles and human values.</li>
              <li>Safety: Avoidance of harmful or dangerous actions.</li>
              <li>Explainability: Transparency and interpretability of decision-making processes.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Future Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Advanced scenario creation tools with branching paths and dynamic elements.</li>
              <li>Integration with popular AI development frameworks and platforms.</li>
              <li>Collaborative benchmarking and peer review system.</li>
              <li>Customizable reporting and visualization of benchmark results.</li>
              <li>AI-assisted scenario generation and improvement suggestions.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default About;