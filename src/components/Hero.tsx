import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, MapPin, ChevronDown } from 'lucide-react'

const typingWords = [
  'Data & Systems Analysis',
  'Operations Analytics',
  'Lean Process Optimization',
  'ITSM & Incident Management',
]

export default function Hero() {
  const typingRef = useRef<HTMLSpanElement>(null)
  const wordIdx = useRef(0)
  const charIdx = useRef(0)
  const isDeleting = useRef(false)
  const typeSpeed = useRef(100)

  useEffect(() => {
    const type = () => {
      const currentWord = typingWords[wordIdx.current]
      const el = typingRef.current
      if (!el) return

      if (isDeleting.current) {
        el.textContent = currentWord.substring(0, charIdx.current - 1)
        charIdx.current--
        typeSpeed.current = 50
      } else {
        el.textContent = currentWord.substring(0, charIdx.current + 1)
        charIdx.current++
        typeSpeed.current = 100
      }

      if (!isDeleting.current && charIdx.current === currentWord.length) {
        typeSpeed.current = 1500
        isDeleting.current = true
      } else if (isDeleting.current && charIdx.current === 0) {
        isDeleting.current = false
        wordIdx.current = (wordIdx.current + 1) % typingWords.length
        typeSpeed.current = 500
      }

      setTimeout(type, typeSpeed.current)
    }
    const timer = setTimeout(type, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="hero" className="relative pt-20 md:pt-24 min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(92,115,96,0.06)_0%,_transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-slate-200/60 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-600">Available for opportunities</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
              Hi, I'm <span className="text-gradient">Varghese John</span>
            </h1>

            <div className="h-8 md:h-10 mb-6">
              <span className="text-lg md:text-xl font-semibold text-slate-500">
                I specialize in <span ref={typingRef} className="text-navy-700 font-bold" />
                <span className="inline-block w-[2px] h-5 md:h-6 bg-navy-700 ml-1 animate-pulse" />
              </span>
            </div>

            <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-xl mb-8">
              An ICT professional with over 8 years of experience across application support, systems analysis, and data reporting.
              Combines a technical foundation in Computer Science with a Master's specialization in Lean Operations and Systems
              to identify process waste, fix system bottlenecks, and build practical dashboards.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a href="mailto:varghesejohn.inbox@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-smooth shadow-soft">
                <Mail size={16} />Email Me
              </a>
              <a href="https://linkedin.com/in/vjohn121" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-smooth shadow-sm">
                <Linkedin size={16} />LinkedIn
              </a>
              <a href="https://github.com/varghesejohn" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-smooth shadow-sm">
                <Github size={16} />GitHub
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin size={14} />
              <span>Wollongong, NSW, Australia</span>
              <span className="mx-2">|</span>
              <span>Full Time Working Rights</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-slate-200/50 to-sage-200/30 blur-xl" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-soft-lg border-4 border-white">
                <img src="/avatar.png" alt="Varghese John profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-soft-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sage-50 flex items-center justify-center">
                    <span className="text-sage-600 font-bold text-sm">8+</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">Years</p>
                    <p className="text-xs text-slate-400">Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex"
        >
          <div className="animate-bounce">
            <ChevronDown size={24} className="text-slate-300" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
