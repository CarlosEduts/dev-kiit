import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Number Generator",
  description: "Generate random numbers with custom length and quantity.",
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>

      {children}
    </section>
  );
}
