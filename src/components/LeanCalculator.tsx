import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Clock, TriangleAlert, TrendingUp, Info } from 'lucide-react'

interface CalculationResult {
  leadTime: number
  efficiency: number
  yield: number
}

export default function LeanCalculator() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const [processingTime, setProcessingTime] = useState<string>('45')
  const [waitingTime, setWaitingTime] = useState<string>('30')
  const [defectCount, setDefectCount] = useState<string>('5')

  const [result, setResult] = useState<CalculationResult>({
    leadTime: 75,
    efficiency: 60,
    yield: 95,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const p = parseFloat(processingTime) || 0
    const w = parseFloat(waitingTime) || 0
    const d = parseFloat(defectCount) || 0
    const leadTime = p + w
    const efficiency = leadTime > 0 ? Math.round((p / leadTime) * 100) : 0
    const yieldPct = d >= 0 && d <= 100 ? Math.round(((100 - d) / 100) * 100) : 0
    setResult({ leadTime, efficiency, yield: yieldPct })
  }, [processingTime, waitingTime, defectCount])

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-sage-400 transition-smooth'
  const labelClass = 'block text-sm font-semibold text-slate-600 mb-2'

  return (
    <section id="calculator" ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={isVisible ? { opacity: 0, y: 20 } : false}
          animate={isVisible ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-sage-600 mb-3">Interactive Tool</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">Lean Process Efficiency Simulator</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            A live calculator demonstrating how Data Analysts quantify operational efficiency. Adjust the inputs to see real-time changes in lead time, efficiency, and quality yield.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={isVisible ? { opacity: 0, x: -20 } : false}
            animate={isVisible ? { opacity: 1, x: 0 } : false}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 md:p-8 shadow-soft"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-center text-sage-600">
                <Calculator size={20} />
              </div>
              <h3 className="font-heading font-semibold text-slate-800">Input Parameters</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className={labelClass}>
                  <span className="inline-flex items-center gap-2"><Clock size={14} />Total Processing Time (minutes)</span>
                </label>
                <input type="number" min="0" value={processingTime} onChange={(e) => setProcessingTime(e.target.value)} className={inputClass} placeholder="e.g. 45" />
                <p className="text-xs text-slate-400 mt-1.5">Actual time spent on value-added work</p>
              </div>
              <div>
                <label className={labelClass}>
                  <span className="inline-flex items-center gap-2"><TriangleAlert size={14} />Total Waiting / Idle Time (minutes)</span>
                </label>
                <input type="number" min="0" value={waitingTime} onChange={(e) => setWaitingTime(e.target.value)} className={inputClass} placeholder="e.g. 30" />
                <p className="text-xs text-slate-400 mt-1.5">Non-value-added time: delays, handoffs, queues</p>
              </div>
              <div>
                <label className={labelClass}>
                  <span className="inline-flex items-center gap-2"><TrendingUp size={14} />Defect Count (per 100 items)</span>
                </label>
                <input type="number" min="0" max="100" value={defectCount} onChange={(e) => setDefectCount(e.target.value)} className={inputClass} placeholder="e.g. 5" />
                <p className="text-xs text-slate-400 mt-1.5">Number of defective outputs in a batch of 100</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={isVisible ? { opacity: 0, x: 20 } : false}
            animate={isVisible ? { opacity: 1, x: 0 } : false}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-navy-50 border border-navy-200 flex items-center justify-center text-navy-700">
                  <TrendingUp size={20} />
                </div>
                <h3 className="font-heading font-semibold text-slate-800">Live Calculations</h3>
              </div>

              <div className="grid gap-4">
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Process Lead Time</p>
                    <p className="text-sm text-slate-600">Processing + Waiting Time</p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-bold text-2xl md:text-3xl text-slate-900">{result.leadTime}</p>
                    <p className="text-xs text-slate-400 font-medium">minutes</p>
                  </div>
                </div>
                <div className="rounded-xl bg-sage-50 border border-sage-200 p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-sage-600 uppercase tracking-wider mb-1">Process Efficiency</p>
                    <p className="text-sm text-sage-700">Processing Time / Lead Time</p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-bold text-2xl md:text-3xl text-sage-700">{result.efficiency}%</p>
                    <p className="text-xs text-sage-500 font-medium">{result.efficiency >= 60 ? 'Good' : result.efficiency >= 40 ? 'Average' : 'Needs Improvement'}</p>
                  </div>
                </div>
                <div className="rounded-xl bg-navy-50 border border-navy-200 p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-navy-600 uppercase tracking-wider mb-1">Quality Yield</p>
                    <p className="text-sm text-navy-700">(100 - Defects) / 100</p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-bold text-2xl md:text-3xl text-navy-700">{result.yield}%</p>
                    <p className="text-xs text-navy-500 font-medium">{result.yield >= 95 ? 'Excellent' : result.yield >= 85 ? 'Acceptable' : 'Review Required'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-1">How Analysts Use These Metrics</p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    <strong className="text-slate-700">Lead Time</strong> reveals the total customer wait. <strong className="text-slate-700">Efficiency</strong> highlights the ratio of value-added work versus waste. <strong className="text-slate-700">Yield</strong> measures output quality.
                    In IT operations, these three metrics together form a triad that guides process improvement: reduce waiting, eliminate defects, and accelerate flow.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
