import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WelcomeSection = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] space-y-8">
      <h2 className="text-5xl font-bold text-center text-gray-800">Welcome to Lovable Benchmarks</h2>
      <p className="text-xl text-center max-w-2xl text-gray-600">
        Lovable Benchmarks is a cutting-edge tool designed for automated benchmarking of GPT Engineer. 
        Our platform provides comprehensive insights into the performance and capabilities of AI-driven engineering solutions.
      </p>
      <div className="space-x-4">
        <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-blue-500 text-blue-500 hover:bg-blue-50">
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
      <Button asChild variant="link" className="text-blue-500 hover:text-blue-600">
        <Link to="/about">Learn More</Link>
      </Button>
    </div>
  );
};

export default WelcomeSection;