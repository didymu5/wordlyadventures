import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wordly Adventures",
  description: "Games for my kid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
