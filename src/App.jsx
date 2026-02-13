import NavBar from './components/layouts/NavBar';
import About from "./components/sections/About.jsx";
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Hero from './components/sections/Hero';

function App() {
  return (
    <div className="min-h-screen bg-black pb-[100vh]">
      <NavBar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
       
      </main>
    </div>
  )
}

export default App

