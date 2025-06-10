"use client";

import type { Client } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone, MoreVertical, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomerCardProps {
  customer: Client;
}

const getInitials = (
  firstName?: string,
  lastName?: string,
  companyName?: string
): string => {
  const first = firstName ? firstName.charAt(0) : "";
  const last = lastName ? lastName.charAt(0) : "";
  if (!first && !last && companyName)
    return companyName.substring(0, 2).toUpperCase();
  if (!first && !last) return "NN";
  return `${first}${last}`.toUpperCase();
};

export function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow bg-card rounded-xl">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage
                src={
                  customer.avatarUrl ||
                  `https://placehold.co/100x100.png?text=${getInitials(
                    customer.firstName,
                    customer.lastName,
                    customer.companyName
                  )}`
                }
                alt={`${customer.firstName} ${customer.lastName}`}
                data-ai-hint="avatar person"
              />
              <AvatarFallback>
                {getInitials(
                  customer.firstName,
                  customer.lastName,
                  customer.companyName
                )}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p
                className="font-semibold text-sm text-foreground truncate"
                title={`${customer.firstName} ${customer.lastName}`}
              >
                {customer.firstName} {customer.lastName}
              </p>
              <p
                className="text-xs text-muted-foreground font-light truncate"
                title={customer.email}
              >
                {customer.email}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground flex-shrink-0"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-light">
              <DropdownMenuItem
                onSelect={() =>
                  (window.location.href = `/customers/${customer.id}`)
                }
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Create Invoice</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center text-xs text-muted-foreground font-light gap-1.5 pt-1">
          <Phone className="h-3.5 w-3.5" />
          <span>{customer.phone || "N/A"}</span>
        </div>

        <div className="pt-1">
          <Link
            href={`/customers/${customer.id}`}
            className="flex items-center justify-end text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            See details <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
