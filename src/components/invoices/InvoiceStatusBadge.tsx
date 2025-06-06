import type { InvoiceStatus } from "@/types";
import { cn } from "@/lib/utils";

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const statusClass = {
    Paid: "status-paid",
    Sent: "status-sent",
    Draft: "status-draft",
    Overdue: "status-overdue",
    Cancelled: "status-cancelled",
  }[status];

  return (
    <span className={cn("status-badge", statusClass)}>
      {status}
    </span>
  );
}
