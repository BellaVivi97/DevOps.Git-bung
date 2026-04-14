import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Task Manager Uebung",
  description: "Next.js 14 Fullstack Uebungsprojekt mit Prisma und SQLite",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <div className="bg-gradient-to-b from-brand-50 via-white to-slate-50">
          {children}
        </div>
      </body>
    </html>
  );
}
