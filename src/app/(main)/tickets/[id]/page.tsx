
"use client";
// This page is intentionally left blank or can be removed.
// Ticket details are now shown in a Sheet on the main /tickets page.
// You can redirect to /tickets or show a message if this route is accessed directly.

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TicketDetailPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/tickets');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Redirecting...</h1>
      <p className="text-muted-foreground">Ticket details are now viewed on the main tickets board.</p>
      <p className="text-muted-foreground">If you are not redirected, <a href="/tickets" className="text-primary hover:underline">click here</a>.</p>
    </div>
  );
}
