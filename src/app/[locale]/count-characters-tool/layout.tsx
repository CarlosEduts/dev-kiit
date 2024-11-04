import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Character & Word Counter",
  description: "Count the number of characters and words in any text.",
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
