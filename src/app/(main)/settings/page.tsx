import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserCircle, Shield, Palette, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <AppHeader pageTitle="Settings" />
      <main className="flex-1 p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="profile" className="font-medium"><UserCircle className="mr-2 h-4 w-4"/>Profile</TabsTrigger>
            <TabsTrigger value="security" className="font-medium"><Shield className="mr-2 h-4 w-4"/>Security</TabsTrigger>
            <TabsTrigger value="appearance" className="font-medium"><Palette className="mr-2 h-4 w-4"/>Appearance</TabsTrigger>
            <TabsTrigger value="notifications" className="font-medium"><Bell className="mr-2 h-4 w-4"/>Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">Profile Settings</CardTitle>
                <CardDescription className="font-light">Manage your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name" className="font-medium">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" className="font-light bg-card" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="font-medium">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" className="font-light bg-card" />
                </div>
                <Button className="font-medium">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
             <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">Security Settings</CardTitle>
                <CardDescription className="font-light">Update your password and manage account security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="current-password" className="font-medium">Current Password</Label>
                  <Input id="current-password" type="password" className="font-light bg-card" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new-password" className="font-medium">New Password</Label>
                  <Input id="new-password" type="password" className="font-light bg-card" />
                </div>
                 <Button className="font-medium">Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">Appearance</CardTitle>
                <CardDescription className="font-light">Customize the look and feel of the application.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-light">Theme customization options (e.g., light/dark mode) will be available here.</p>
                 <img src="https://placehold.co/400x200.png?text=Theme+Options" alt="Placeholder for theme options" className="mt-4 rounded opacity-50" data-ai-hint="theme options" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
             <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">Notification Settings</CardTitle>
                <CardDescription className="font-light">Manage your email and in-app notification preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-light">Fine-grained notification controls will be available here.</p>
                <img src="https://placehold.co/400x200.png?text=Notification+Controls" alt="Placeholder for notification controls" className="mt-4 rounded opacity-50" data-ai-hint="notification controls" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
