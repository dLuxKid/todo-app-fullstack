import Header from "@/component/header";
import { UserProvider } from "@/context/useContext";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "Todo App",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <Toaster />
        <body className="bg-slate-800 text-slate-100 container mx-auto p-4 w-screen">
          <Header />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
