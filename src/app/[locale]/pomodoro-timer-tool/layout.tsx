import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description:
    "Stay focused with the Pomodoro technique. Set a timer for work and break periods.",
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
