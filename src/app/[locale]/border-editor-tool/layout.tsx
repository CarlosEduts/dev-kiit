import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Border and Border-Radius Editor",
  description: "Customize the border and border radius of the element.",
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
