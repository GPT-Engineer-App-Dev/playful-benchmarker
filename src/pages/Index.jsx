import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth";
import { useBenchmarkScenarios, useRuns } from "../integrations/supabase";
import ScenarioList from "../components/ScenarioList";
import RunsList from "../components/RunsList";
import Navbar from "../components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, PlayCircle, BarChart2, Settings, Zap } from "lucide-react";

const Index = () => {
  const { session } = useSupabaseAuth();
  const { data: scenarios, isLoading: isLoadingScenarios } = useBenchmarkScenarios();
  const { data: runs, isLoading: isLoadingRuns } = useRuns();

  const totalScenarios = scenarios?.length || 0;
  const totalRuns = runs?.length || 0;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        {session ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800">Welcome, {session.user.email}</h2>
              <Button asChild variant="outline">
                <Link to="/secrets" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Secrets
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Scenarios</CardTitle>
                  <BarChart2 className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {isLoadingScenarios ? "Loading..." : totalScenarios}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
                  <Zap className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {isLoadingRuns ? "Loading..." : totalRuns}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-2 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-around">
                  <Button asChild className="flex-1 mr-2 bg-blue-500 hover:bg-blue-600" size="lg">
                    <Link to="/create-scenario" className="flex items-center justify-center">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Scenario
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 ml-2 bg-green-500 hover:bg-green-600" size="lg">
                    <Link to="/start-benchmark" className="flex items-center justify-center">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Start Benchmark
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Recent Scenarios</CardTitle>
                <CardDescription>A list of your most recent scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <ScenarioList />
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Recent Runs</CardTitle>
                <CardDescription>A list of your most recent benchmark runs</CardDescription>
              </CardHeader>
              <CardContent>
                <RunsList />
              </CardContent>
            </Card>
          </div>
        ) : (
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
        )}
      </main>
    </div>
  );
};

export default Index;