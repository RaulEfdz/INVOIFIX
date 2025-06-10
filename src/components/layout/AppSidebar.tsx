"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Settings,
  LogOut,
  Users,
  User2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { userAgent } from "next/server";

const navItems = [
  { href: "/admin/dashboard", label: "Panel", icon: LayoutDashboard },
  { href: "/admin/invoices", label: "Facturas", icon: FileText },
  { href: "/admin/tickets", label: "Tickets", icon: ClipboardList },
  { href: "/admin/clients", label: "Clientes", icon: Users },
  { href: "/admin/team", label: "Equipo", icon: Users },
  { href: "/admin/settings", label: "Configuración", icon: Settings },
];

const navAccessMode = [
  { href: "/client", label: "Cliente", icon: Users },
  { href: "/employee", label: "Empleado", icon: User2 },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      side="left"
      className="border-r"
    >
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="InvoiFix Logo"
            width={300}
            height={300}
            className="h-7 w-auto text-primary"
          />
          {open && (
            <h1 className="text-xl font-headline font-bold text-foreground"></h1>
          )}
        </Link>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <Separator className="my-0" />
      <SidebarContent className="flex-grow p-4">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  className={cn(
                    "font-medium",
                    pathname === item.href ||
                      (item.href !== "/admin/dashboard" &&
                        pathname.startsWith(item.href))
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  isActive={
                    pathname === item.href ||
                    (item.href !== "/admin/dashboard" &&
                      pathname.startsWith(item.href))
                  }
                  tooltip={{ children: item.label, className: "font-light" }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="truncate">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator />

      <Separator className="my-0" />
      <SidebarContent className="flex-grow p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <span className="text-sm font-medium text-muted-foreground">
              Modo de acceso
            </span>
          </SidebarMenuItem>
          {navAccessMode.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  className={cn(
                    "font-medium",
                    pathname === item.href
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, className: "font-light" }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="truncate">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Link href="/profile" legacyBehavior passHref>
          <SidebarMenuButton
            className="font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            tooltip={{ children: "Profile", className: "font-light" }}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://placehold.co/100x100.png"
                alt="Avatar de usuario"
                data-ai-hint="user avatar"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {open && (
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">Juan Pérez</span>
                <span className="text-xs font-light text-muted-foreground">
                  Administrador
                </span>
              </div>
            )}
          </SidebarMenuButton>
        </Link>
        <Link href="/login" legacyBehavior passHref>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-5 w-5" />
            {open && <span>Cerrar sesión</span>}
            {!open && <span className="sr-only">Cerrar sesión</span>}
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
