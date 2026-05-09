import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Home     from "./pages/Home";
import About    from "./pages/About";
import Services from "./pages/Services";
import Contact  from "./pages/Contact";


export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop /> 
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/"         element={<Home />}     />
          <Route path="/about"    element={<About />}    />
          <Route path="/services" element={<Services />} />
          <Route path="/contact"  element={<Contact />}  />
        </Routes>
      </main>
    </BrowserRouter>
  );
}