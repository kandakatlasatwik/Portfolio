import NavBar from './components/layouts/NavBar';
import About from "./components/sections/About.jsx";
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Hero from './components/sections/Hero';
import Contact from './components/sections/Contact';
import Footer from './components/layouts/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black ">
      <NavBar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
       
      </main>
      <Footer />
    </div>
  )
}

export default App

