import React from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Client Portal Layout */}
      {children}
    </div>
  );
}
