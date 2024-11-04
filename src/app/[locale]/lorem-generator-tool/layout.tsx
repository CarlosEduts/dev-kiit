import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator",
  description: "Enter the number of paragraphs to generate example text.",
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
