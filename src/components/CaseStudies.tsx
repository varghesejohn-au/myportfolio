import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ChartBar as BarChart3, Package, ArrowRight } from 'lucide-react'

interface Project {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  context: string
  process: string
  impact: string
  tools: string[]
  embedLabel: string
}

const projects: Project[] = [
  {
    id: 'itsm',
    title: 'Enterprise ITSM Optimization Dashboard',
    subtitle: 'Incident Pipeline Analysis & SLA Tracking',
    icon: <BarChart3 size={24} />,
    context: 'Analyzing simulated ServiceNow and Jira incident and ticketing data across a multi-site enterprise environment. The dataset included ticket volumes, resolution cycle times, SLA breach flags, and category distributions.',
    process: 'Used SQL to identify recurring P1/P2 failure patterns and bottleneck queues. Built a Power BI dashboard tracking cycle times against SLA parameters to highlight operational waste. Applied Lean principles to map ticket flow from creation to resolution.',
    impact: 'Enabled cross-functional leadership to visualize support pipeline constraints in real-time. Identified 23% of tickets were stuck in reassignment loops, leading to revised escalation rules and improved mean-time-to-resolution.',
    tools: ['Power BI', 'SQL', 'ServiceNow', 'Jira', 'ITIL'],
    embedLabel: 'Interactive Power BI Report Embed View',
  },
  {
    id: 'supply',
    title: 'Supply Chain Inventory & Demand Analyzer',
    subtitle: 'Historical Invoice Processing & Stock Optimization',
    icon: <Package size={24} />,
    context: 'Processing historical invoice and transaction data from a multi-channel retail operation. The dataset covered product lines, vendor transactions, seasonal demand spikes, and stock-out frequencies across twelve months.',
    process: 'Applied Lean data tracking in Excel via Power Query to map product performance, vendor ranking metrics, and multi-channel customer trends. Used SQL to correlate inventory levels with demand signals and flag dead stock.',
    impact: 'Modeled stock optimizations to prevent inventory waste and improve commercial margins. Identified slow-moving SKUs representing 18% of holding costs, enabling targeted markdown strategies and vendor renegotiation.',
    tools: ['Excel', 'Power Query', 'SQL', 'Lean Operations', 'Process Mapping'],
    embedLabel: 'Interactive Power BI Report Embed View',
  },
]

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeProject, setActiveProject] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="case-studies" ref={sectionRef} className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={isVisible ? { opacity: 0, y: 20 } : false}
          animate={isVisible ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-sage-600 mb-3">Portfolio</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">Case Studies & Projects</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Selected projects demonstrating the intersection of data analysis, systems thinking, and Lean operations.
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={isVisible ? { opacity: 0, y: 30 } : false}
              animate={isVisible ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-soft hover:shadow-soft-lg transition-smooth"
            >
              <div className="p-6 md:p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-navy-50 border border-navy-200 flex items-center justify-center text-navy-700">
                        {project.icon}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-sage-600 uppercase tracking-wider">{project.subtitle}</span>
                        <h3 className="font-heading font-bold text-xl md:text-2xl text-slate-900">{project.title}</h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6 mt-4">
                      {project.tools.map((tool) => (
                        <span key={tool} className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">{tool}</span>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Context</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{project.context}</p>
                      </div>
                      <div className="rounded-xl bg-sage-50 border border-sage-200 p-4">
                        <h4 className="text-xs font-bold text-sage-600 uppercase tracking-wider mb-2">Process & Lean Angle</h4>
                        <p className="text-sm text-sage-700 leading-relaxed">{project.process}</p>
                      </div>
                      <div className="rounded-xl bg-navy-50 border border-navy-200 p-4">
                        <h4 className="text-xs font-bold text-navy-600 uppercase tracking-wider mb-2">Impact</h4>
                        <p className="text-sm text-navy-700 leading-relaxed">{project.impact}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-[420px] xl:w-[480px] flex-shrink-0">
                    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-6 text-center min-h-[260px] flex flex-col items-center justify-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                        <BarChart3 size={28} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-500 mb-1">{project.embedLabel}</p>
                        <p className="text-xs text-slate-400 max-w-xs">Public Power BI dashboard link will be embedded here. Contact me for live access.</p>
                      </div>
                      <button
                        onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-smooth"
                      >
                        {activeProject === project.id ? 'Hide Details' : 'View Details'}<ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {activeProject === project.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="border-t border-slate-200 bg-slate-50/50 px-6 md:px-8 lg:px-10 py-6">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="rounded-lg bg-white border border-slate-200 p-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Data Sources</p>
                      <p className="text-sm text-slate-700">
                        {project.id === 'itsm' ? 'ServiceNow export, Jira CSV dumps, SLA reference tables' : 'Invoice history, vendor master data, product catalog'}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white border border-slate-200 p-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Methodology</p>
                      <p className="text-sm text-slate-700">
                        {project.id === 'itsm' ? 'SQL aggregation, DAX measures, Lean cycle-time analysis' : 'Power Query transformation, Pareto analysis, trend correlation'}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white border border-slate-200 p-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Stakeholders</p>
                      <p className="text-sm text-slate-700">
                        {project.id === 'itsm' ? 'IT Operations Lead, Service Desk Manager, CIO Office' : 'Supply Chain Manager, Procurement Lead, Finance Director'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-end gap-2">
                    <span className="text-xs text-slate-400">Live demo available upon request</span>
                    <ExternalLink size={12} className="text-slate-400" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
