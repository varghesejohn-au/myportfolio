import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SkillsFilter from './components/SkillsFilter'
import CaseStudies from './components/CaseStudies'
import LeanCalculator from './components/LeanCalculator'
import Timeline from './components/Timeline'
import Footer from './components/Footer'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'case-studies', 'calculator', 'timeline']
      const scrollPosition = window.scrollY + 120
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <SkillsFilter />
        <CaseStudies />
        <LeanCalculator />
        <Timeline />
      </main>
      <Footer />
    </div>
  )
}

export default App
