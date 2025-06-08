import { AppHeader } from "@/components/layout/AppHeader";
import { SummaryCards } from "./components/SummaryCards";
import { QuickActions } from "./components/QuickActions";
import { RecentActivity } from "./components/RecentActivity";
import { WelcomeCard } from "./components/WelcomeCard";

export default function DashboardPage() {
  return (
    <>
      <AppHeader pageTitle="Dashboard" />
      <main className="flex-1 p-6 space-y-6">
        <SummaryCards />
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <QuickActions />
          <RecentActivity />
        </section>
        <section>
          <WelcomeCard />
        </section>
      </main>
    </>
  );
}
