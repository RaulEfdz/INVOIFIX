import { AppHeader } from "../../../components/layout/AppHeader";
import { SummaryCards } from "./components/SummaryCards";
import { QuickActions } from "./components/QuickActions";
import { RecentActivity } from "./components/RecentActivity";
import { WelcomeCard } from "./components/WelcomeCard";

export default function DashboardPage() {
  return (
    <>
      <AppHeader pageTitle="Dashboard" />
      <main className="flex-1 p-6 space-y-6">
        <QuickActions />
        <SummaryCards />
        <RecentActivity />
      </main>
    </>
  );
}
