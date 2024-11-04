import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reverse Text Generator",
  description:
    "Enter the text you want to reverse and click the button to see the result.",
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
