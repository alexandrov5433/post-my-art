import type { Metadata } from "next";
import "@/ui/styles/global/color.css";
import "@/ui/styles/global/reset.css"
import "@/ui/styles/global/typography.css"
import { roboto, charm } from "@/ui/fonts";
import NavBar from "@/ui/nav";

export const metadata: Metadata = {
  title: "Post My Art",
  description: "A platform for sharing art pieces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${charm.variable}`}>
      <body>
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  );
}
