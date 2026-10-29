import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Approach from '../components/sections/Approach';
import Contact from '../components/sections/Contact';

export default function Page() {
  return (
    <main className="relative w-full min-h-screen bg-black overflow-x-hidden text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Approach />
      <Contact />
      <Footer />
    </main>
  );
}
