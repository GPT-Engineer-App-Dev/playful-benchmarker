import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ScenarioList from "./ScenarioList";
import RunsList from "./RunsList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, PlayCircle, BarChart2, Settings, Zap } from "lucide-react";

const DashboardContent = ({ session, totalScenarios, totalRuns, isLoadingScenarios, isLoadingRuns }) => {
  return (
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
  );
};

export default DashboardContent;