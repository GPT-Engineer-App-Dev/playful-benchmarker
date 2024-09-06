import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">About Lovable Benchmarks</h2>
        <div className="space-y-4">
          <p>
            Lovable Benchmarks is a sophisticated tool designed for automated benchmarking of GPT Engineer. 
            Our mission is to provide comprehensive and objective assessments of AI-driven engineering solutions.
          </p>
          <h3 className="text-2xl font-semibold mt-6 mb-2">How It Works</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              We use benchmark scenarios where an LLM simulates a user interacting with the product to build web applications.
            </li>
            <li>
              Each scenario follows a prompt outlining the simulated user's goals and requirements.
            </li>
            <li>
              After completion, another set of LLMs reviews the results to assess performance across various dimensions.
            </li>
          </ul>
          <h3 className="text-2xl font-semibold mt-6 mb-2">Future Features</h3>
          <p>
            We are continuously working to enhance Lovable Benchmarks. Upcoming features include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Interactive dashboards for visualizing performance metrics</li>
            <li>Detailed graphs showing comparisons between different system versions</li>
            <li>A user-friendly interface for editing and customizing benchmark scenario prompts</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default About;