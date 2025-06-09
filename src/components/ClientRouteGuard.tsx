"use client";

import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface ClientRouteGuardProps {
  children: ReactNode;
}

export function ClientRouteGuard({ children }: ClientRouteGuardProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "Client") {
      router.push("/login");
    }
  }, [user, router]);

  if (!user || user.role !== "Client") {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
