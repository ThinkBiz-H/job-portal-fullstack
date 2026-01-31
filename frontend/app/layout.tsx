import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export const metadata = {
  title: "ApnaJob - Find Jobs",
  description: "Best job portal in India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">

        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>
        
      <Footer/>
      </body>
    </html>
  );
}
