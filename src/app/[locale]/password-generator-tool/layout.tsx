import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator",
  description: "Choose options and click to generate a secure password.",
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
