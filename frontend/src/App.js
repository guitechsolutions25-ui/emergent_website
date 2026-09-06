import { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "@/components/Nav";
import { Footer } from "@/sections/Closing";
import HomePage from "@/pages/HomePage";
import LegalPage from "@/pages/LegalPage";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="grain min-h-screen bg-ink text-foreground">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/termos-e-privacidade" element={<LegalPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
