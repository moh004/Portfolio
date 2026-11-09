import './assets/App.css'
import Navbar from './component/Navbar'
import Hero from './component/HeroDark'
import Projects from './component/Project'
import MySkills from './component/Skills'
import HeroKingsLanding from './component/HeroLight'
import Contact from './component/Contact'
import { useState,useEffect } from "react";
import { useTranslation } from 'react-i18next'


function App() {
  // Dark/Light Mode
  const [isDark,setIsDark] = useState(
     localStorage.getItem("theme") === "dark"
  );

  useEffect( () => {
      document.documentElement.classList.toggle("dark" , isDark)
      localStorage.setItem("theme", isDark? "dark" : "light")    
  },[isDark])

  // for lang
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

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