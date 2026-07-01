import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Administration | Elodie Fleury",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
