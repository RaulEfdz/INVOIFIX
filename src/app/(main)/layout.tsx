import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <AppSidebar />
      <SidebarInset className="flex flex-col bg-background">
        {/* AppHeader will be included per page or in a nested layout if always static */}
        {children}
      </SidebarInset>
    </div>
  );
}
