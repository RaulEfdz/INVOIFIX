import { AppHeader } from "@/components/layout/AppHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserCircle, Shield, Palette, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <AppHeader pageTitle="Configuración" />
      <main className="flex-1 p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="profile" className="font-medium">
              <UserCircle className="mr-2 h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="security" className="font-medium">
              <Shield className="mr-2 h-4 w-4" />
              Seguridad
            </TabsTrigger>
            <TabsTrigger value="appearance" className="font-medium">
              <Palette className="mr-2 h-4 w-4" />
              Apariencia
            </TabsTrigger>
            <TabsTrigger value="notifications" className="font-medium">
              <Bell className="mr-2 h-4 w-4" />
              Notificaciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">
                  Configuración de perfil
                </CardTitle>
                <CardDescription className="font-light">
                  Administre su información personal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name" className="font-medium">
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    defaultValue="John Doe"
                    className="font-light bg-card"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="font-medium">
                    Dirección de correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="font-light bg-card"
                  />
                </div>
                <Button className="font-medium">Guardar cambios</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">
                  Configuración de seguridad
                </CardTitle>
                <CardDescription className="font-light">
                  Actualice su contraseña y administre la seguridad de la
                  cuenta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="current-password" className="font-medium">
                    Contraseña actual
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="font-light bg-card"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new-password" className="font-medium">
                    Nueva contraseña
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    className="font-light bg-card"
                  />
                </div>
                <Button className="font-medium">Actualizar contraseña</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">
                  Apariencia
                </CardTitle>
                <CardDescription className="font-light">
                  Personalice la apariencia de la aplicación.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-light">
                  Las opciones de personalización del tema (por ejemplo, modo
                  claro/oscuro) estarán disponibles aquí.
                </p>
                <img
                  src="https://placehold.co/400x200.png?text=Theme+Options"
                  alt="Placeholder for theme options"
                  className="mt-4 rounded opacity-50"
                  data-ai-hint="theme options"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline font-semibold">
                  Configuración de notificaciones
                </CardTitle>
                <CardDescription className="font-light">
                  Administre sus preferencias de notificaciones por correo
                  electrónico y dentro de la aplicación.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-light">
                  Los controles de notificación detallados estarán disponibles
                  aquí.
                </p>
                <img
                  src="https://placehold.co/400x200.png?text=Notification+Controls"
                  alt="Placeholder for notification controls"
                  className="mt-4 rounded opacity-50"
                  data-ai-hint="notification controls"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
