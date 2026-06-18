import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChartBar as BarChart3, Database, Workflow, Monitor, Check } from 'lucide-react'

interface SkillCategory {
  id: string
  name: string
  icon: React.ReactNode
  skills: string[]
  color: string
  bgColor: string
  borderColor: string
}

const skillCategories: SkillCategory[] = [
  {
    id: 'data',
    name: 'Data Analytics & BI',
    icon: <BarChart3 size={18} />,
    skills: ['Power BI', 'Excel', 'Power Query', 'Dashboard Design', 'Data Visualization'],
    color: 'text-navy-700',
    bgColor: 'bg-navy-50',
    borderColor: 'border-navy-200',
  },
  {
    id: 'db',
    name: 'Database & Query Languages',
    icon: <Database size={18} />,
    skills: ['SQL', 'PostgreSQL', 'MySQL', 'Data Modeling', 'ETL Pipelines'],
    color: 'text-sage-700',
    bgColor: 'bg-sage-50',
    borderColor: 'border-sage-200',
  },
  {
    id: 'ops',
    name: 'Operational Frameworks',
    icon: <Workflow size={18} />,
    skills: ['Lean Operations', 'Process Mapping', 'Waste Elimination', 'ITIL', 'Value Stream Analysis'],
    color: 'text-slate-700',
    bgColor: 'bg-slate-100',
    borderColor: 'border-slate-300',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Ecosystems',
    icon: <Monitor size={18} />,
    skills: ['ServiceNow', 'Jira', 'Microsoft 365', 'Active Directory', 'VMware'],
    color: 'text-navy-800',
    bgColor: 'bg-navy-100',
    borderColor: 'border-navy-300',
  },
]

const projects = [
  { id: 'itsm', name: 'Enterprise ITSM Optimization Dashboard', tools: ['Power BI', 'SQL', 'ServiceNow', 'Jira', 'ITIL'] },
  { id: 'supply', name: 'Supply Chain Inventory & Demand Analyzer', tools: ['Excel', 'Power Query', 'SQL', 'Lean Operations', 'Process Mapping'] },
]

export default function SkillsFilter() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [highlightedProjects, setHighlightedProjects] = useState<string[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (activeFilters.length === 0) { setHighlightedProjects([]); return }
    const matched = projects.filter((p) => activeFilters.some((f) => p.tools.includes(f))).map((p) => p.id)
    setHighlightedProjects(matched)
  }, [activeFilters])

  const toggleSkill = (skill: string) => {
    setActiveFilters((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill])
  }
  const clearFilters = () => setActiveFilters([])

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={isVisible ? { opacity: 0, y: 20 } : false}
          animate={isVisible ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-sage-600 mb-3">Core Competencies</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">Skills & Technologies</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Click on any skill to highlight the projects below that utilize it. This demonstrates how each tool connects to real-world deliverables.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              initial={isVisible ? { opacity: 0, y: 20 } : false}
              animate={isVisible ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm hover:shadow-md transition-smooth"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.bgColor} ${cat.color} border ${cat.borderColor}`}>
                  {cat.icon}
                </div>
                <h3 className="font-heading font-semibold text-slate-800 text-base">{cat.name}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const isActive = activeFilters.includes(skill)
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth border ${isActive ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      {isActive && <Check size={13} />}
                      {skill}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {activeFilters.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sage-50 border border-sage-200 text-sm text-sage-700">
              <span className="font-semibold">{activeFilters.length}</span>
              <span>skill{activeFilters.length > 1 ? 's' : ''} selected</span>
            </div>
            <button onClick={clearFilters} className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-smooth">Clear all</button>
          </motion.div>
        )}

        {highlightedProjects.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 text-sm text-navy-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-navy-500" />
              Highlights {highlightedProjects.length} project{highlightedProjects.length > 1 ? 's' : ''} below
            </span>
          </motion.div>
        )}
      </div>
    </section>
  )
}
