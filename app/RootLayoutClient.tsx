"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");


  // Google Tag (gtag.js)
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.setAttribute("async", "");
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-WHXP5YHDZF";
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-WHXP5YHDZF');
    `;
    document.head.appendChild(script2);
  }, []);

  const shouldHideNavbarFooter =
    isAdminRoute


  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      <AuthProvider>
        {children}
      </AuthProvider>
      {!shouldHideNavbarFooter && <Footer />}
    </>
  );
}
