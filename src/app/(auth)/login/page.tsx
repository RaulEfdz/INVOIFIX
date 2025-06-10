"use client";

import Link from "next/link";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { AtSign, Lock } from "lucide-react"; // Building for InvoiFix logo idea
import Image from "next/image";

export default function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, handle login logic here
    // For now, redirect to dashboard on successful login (simulated)
    // This client-side redirect is for demo purposes.
    // Proper auth flow would involve server actions / API calls.
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {/* Using a generic building icon for logo placeholder */}
            <Image
              src="/logo.png"
              alt="InvoiFix Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </div>
          <CardTitle className="text-3xl font-headline font-bold">
            InvoiFix
          </CardTitle>
          <CardDescription className="font-light">
            Inicia sesión para administrar tus facturas y tickets de soporte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Dirección de correo electrónico
              </Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-medium">
                  Contraseña
                </Label>
                <Link
                  href="#"
                  className="text-sm text-primary hover:underline font-light"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <Button type="submit" className="w-full font-medium">
              Iniciar sesión
            </Button>
          </form>
          <p className="mt-6 text-center text-sm font-light text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link href="#" className="font-medium text-primary hover:underline">
              Regístrate
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
