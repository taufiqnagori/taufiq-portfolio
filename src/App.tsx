import { useState } from "react";
import { SettingsProvider, useSettings } from "./context/SettingsContext";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function Site() {
  const [loaderDone, setLoaderDone] = useState(false);
  const { lowPower } = useSettings();

  // The site mounts immediately and the loader is just a brief overlay on
  // top of it — hero text is already painted by the time the fade finishes.
  return (
    <>
      {!loaderDone && <LoadingScreen onDone={() => setLoaderDone(true)} />}
      <CustomCursor enabled={!lowPower} />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <Site />
    </SettingsProvider>
  );
}
