import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Award, Building2, Calendar, ChevronRight } from 'lucide-react'

interface TimelineEntry {
  id: string
  type: 'work' | 'education'
  title: string
  subtitle: string
  location: string
  period: string
  description?: string[]
  highlights?: string[]
}

const timelineEntries: TimelineEntry[] = [
  {
    id: 'hammond',
    type: 'work',
    title: 'ICT Systems & Data Support',
    subtitle: 'HammondCare',
    location: 'NSW, Australia',
    period: 'Nov 2025 - Present',
    description: [
      'Administer and monitor cloud-based PACS (Picture Archiving and Communication System) for 24/7 availability.',
      'Manage resident data platform (Leecare) and support clinical staff with technical troubleshooting.',
      'Maintain data integrity via routine audits, QA checks, and failed medical record upload remediation.',
    ],
  },
  {
    id: 'pcc',
    type: 'work',
    title: 'Business Support & Data Analyst',
    subtitle: 'PCC Computers',
    location: 'NSW, Australia',
    period: 'Jun 2025 - Aug 2025',
    description: [
      'Utilized Zoho CRM for order management and built weekly dashboard reports for tracking and insights.',
      'Performed stock analysis using invoice history to initiate purchase orders based on demand signals.',
      'Created a proof-of-concept for automated inventory management using PowerQuery and Zoho CRM data.',
    ],
  },
  {
    id: 'ibm-analyst',
    type: 'work',
    title: 'ICT Systems Analyst - IBM Solutioning',
    subtitle: 'IBM',
    location: 'Bangalore, India',
    period: 'Oct 2020 - Apr 2025',
    description: [
      'Consulted stakeholders to elicit business requirements and designed technical system improvements.',
      'Led integration builds and data pipelines from ingestion to dashboards with secure-by-default configurations.',
      'Managed IAM, user access controls, and SSO logins for enterprise solution applications.',
    ],
  },
  {
    id: 'ibm-infra',
    type: 'work',
    title: 'Infrastructure System Engineer II',
    subtitle: 'IBM',
    location: 'Bangalore, India',
    period: 'Jul 2017 - Oct 2022',
    description: [
      'Provided operational support for Windows and VMware infrastructure across multiple client accounts.',
      'Administered Active Directory, DHCP/DNS, and resolved IIS issues to maintain secure web services.',
      'Remediated server vulnerabilities and handled P1/P2 incidents under pressure across cross-functional teams.',
    ],
  },
  {
    id: 'mba',
    type: 'education',
    title: 'Master of Business Administration (MBA)',
    subtitle: 'Lean Operations & Systems',
    location: 'Christ University, Bangalore, India',
    period: 'Jun 2015 - Apr 2017',
    highlights: ['Specialization in process optimization and Lean methodologies'],
  },
  {
    id: 'btech',
    type: 'education',
    title: 'B.Tech in Computer Science Engineering',
    subtitle: 'CSE',
    location: 'Calicut University, Kerala, India',
    period: 'Jun 2011 - Apr 2015',
    highlights: ['Foundation in algorithms, databases, and system architecture'],
  },
]

const certifications = [
  { name: 'Certified Data Scientist', provider: 'Data Science Analytics', date: 'Jun 2023' },
  { name: 'IBM Cloud Advocate', provider: 'Cloud Solutions & Infrastructure', date: 'Aug 2021' },
  { name: 'SQL for Data Science', provider: 'Relational Database Queries', date: 'May 2021' },
  { name: 'Python for Data Science', provider: 'Data Structures & Scripting', date: 'Nov 2018' },
  { name: 'Enterprise Design Thinking Practitioner', provider: 'Design Thinking & Innovation', date: 'Nov 2017' },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="timeline" ref={sectionRef} className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={isVisible ? { opacity: 0, y: 20 } : false}
          animate={isVisible ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-sage-600 mb-3">Career Journey</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">Professional Timeline & Education</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            A career spanning enterprise infrastructure, systems analysis, business support, and clinical data operations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-10 lg:gap-12">
          <div>
            <div className="relative pl-8 md:pl-12">
              <div className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-[2px] bg-slate-200 rounded-full" />
              {timelineEntries.map((entry, idx) => {
                const isWork = entry.type === 'work'
                return (
                  <motion.div
                    key={entry.id}
                    initial={isVisible ? { opacity: 0, y: 20 } : false}
                    animate={isVisible ? { opacity: 1, y: 0 } : false}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative mb-8 last:mb-0"
                  >
                    <div className={`absolute left-[-33px] md:left-[-49px] top-1 w-6 h-6 rounded-full border-[3px] bg-white z-10 ${isWork ? 'border-navy-400' : 'border-sage-400'}`} />
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition-smooth">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {isWork ? <Building2 size={14} className="text-navy-500" /> : <GraduationCap size={14} className="text-sage-500" />}
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{isWork ? 'Employment' : 'Education'}</span>
                          </div>
                          <h3 className="font-heading font-bold text-slate-900 text-base md:text-lg">{entry.title}</h3>
                          <p className="text-sm font-medium text-slate-500">{entry.subtitle}<span className="text-slate-300 mx-2">|</span>{entry.location}</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-500 whitespace-nowrap">
                          <Calendar size={12} />{entry.period}
                        </div>
                      </div>
                      {entry.description && (
                        <ul className="space-y-2 mt-3">
                          {entry.description.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                              <ChevronRight size={14} className="text-slate-300 mt-1 flex-shrink-0" />{item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {entry.highlights && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {entry.highlights.map((h, i) => (
                            <span key={i} className="px-3 py-1 rounded-lg text-xs font-medium bg-sage-50 text-sage-700 border border-sage-200">{h}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <motion.div
            initial={isVisible ? { opacity: 0, y: 20 } : false}
            animate={isVisible ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-soft sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-center text-sage-600">
                  <Award size={20} />
                </div>
                <h3 className="font-heading font-bold text-slate-800 text-lg">Certifications</h3>
              </div>
              <div className="space-y-4">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{cert.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{cert.provider}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md whitespace-nowrap">{cert.date}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
                    <p className="font-heading font-bold text-2xl text-slate-900">8+</p>
                    <p className="text-xs text-slate-500 mt-1">Years Experience</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-center">
                    <p className="font-heading font-bold text-2xl text-slate-900">5</p>
                    <p className="text-xs text-slate-500 mt-1">Certifications</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
