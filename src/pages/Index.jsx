import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth";
import { useBenchmarkScenarios, useRuns } from "../integrations/supabase";
import ScenarioList from "../components/ScenarioList";
import RunsList from "../components/RunsList";
import Navbar from "../components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, PlayCircle, BarChart2, Settings, Zap } from "lucide-react";
import WelcomeSection from "../components/WelcomeSection";
import DashboardContent from "../components/DashboardContent";

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
          <DashboardContent
            session={session}
            totalScenarios={totalScenarios}
            totalRuns={totalRuns}
            isLoadingScenarios={isLoadingScenarios}
            isLoadingRuns={isLoadingRuns}
          />
        ) : (
          <WelcomeSection />
        )}
      </main>
    </div>
  );
};

export default Index;