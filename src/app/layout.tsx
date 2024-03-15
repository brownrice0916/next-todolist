import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import QueryProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To Do List",
  description: "할일을 하자",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <nav className="flex mb-5">
            <Link className="py-3 px-5" href="/">
              Home
            </Link>
            <Link className="py-3 px-5" href="/about">
              About
            </Link>
            <Link className="py-3 px-5" href="/report">
              Report
            </Link>
            <Link className="py-3 px-5" href="/todos-csr">
              Todos-CSR
            </Link>
            <Link className="py-3 px-5" href="/todos-ssr">
              Todos-SSR
            </Link>
          </nav>
          <div className="px-5">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
