import './assets/App.css'
import Navbar from './component/Navbar'
import Hero from './component/Hero'
import Projects from './component/Project'
import MySkills from './component/Skills'
import HeroKingsLanding from './component/HeroKingsLanding'
import Contact from './component/Contact'
import { useState,useEffect } from "react";


function App() {
  const [isDark,setIsDark] = useState(
     localStorage.getItem("theme") === "dark"
  );

  useEffect( () => {
      document.documentElement.classList.toggle("dark" , isDark)
      localStorage.setItem("theme", isDark? "dark" : "light")    
  },[isDark])

  console.log(isDark , `${isDark? "night" : "day"}`)
  return (
    <>
      <Navbar setIsDark={setIsDark} isDark={isDark} />
      {isDark ? <Hero /> : <HeroKingsLanding />}
      <Projects />
      <MySkills />
      <Contact/>
    </>
  );
}

export default App;