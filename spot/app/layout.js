import { ThemeProvider } from "@/components/theme-provider";
import {Glow} from "@/components/glow";
import Header from "@/components/header";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {dark} from "@clerk/themes";

export const metadata = {
  title: "Spot",
  description: "Discover and create amazing events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={'bg-linear-to-br from-gray-950 via-zinc-900 to-stone-900 text-white'}>
            <ClerkProvider
            appearance={{
     theme:dark,
   }}
    >

            <ConvexClientProvider>
        {/* Header */}
        <Header />
        <main className=" relative min-h-screen container mx-auto pt-40 md:pt-30">
         <Glow />
        <div className="pointer-events-none absolute inset-ring-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/25 rounded-full"/>
          <div className="absolute"/>
        </div>
        <div className="relative z-10 min-h-[70vh]">{children}</div>
        </main>
        </ConvexClientProvider>
        </ClerkProvider>
      
        {/* footer */}
        <footer className="border-gray-800/50 py-8 px-6 max-w-7xl mx-auto">
          <div> Made with Love❤️</div>
        </footer>
        </body>
    </html>
  );
}
