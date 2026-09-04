import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./components/Blog";

const EditorialDesk = import.meta.env.DEV ? lazy(() => import("./pages/EditorialDesk")) : null;

export default function App() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Index />} />
    <Route path="/blog" element={<Blog />} />
    {EditorialDesk && <Route path="/gestao" element={<Suspense fallback={<div role="status">Abrindo painel editorial…</div>}><EditorialDesk /></Suspense>} />}
    <Route path="*" element={<NotFound />} />
  </Routes></BrowserRouter>;
}
