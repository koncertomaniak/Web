import { Roboto } from "next/font/google";
import "./globals.css";
import { APP_NAME } from "@/app/constants";
import Appbar from "@/app/components/appbar/Appbar";
import styles from "./layout.module.sass";

export const metadata = {
  title: APP_NAME,
  description: "Generated by create next app",
};

const roboto = Roboto({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
