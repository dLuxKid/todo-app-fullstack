import Header from "@/component/header";
import "./globals.css";

export const metadata = {
  title: "Todo App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-slate-800 text-slate-100 container mx-auto p-4`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
