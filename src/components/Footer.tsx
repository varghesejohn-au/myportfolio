import { Linkedin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-heading font-bold text-white text-lg mb-1">Varghese John</p>
            <p className="text-sm">Data & Systems Analyst | Wollongong, NSW, Australia</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/in/vjohn121" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-smooth" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:varghesejohn.inbox@gmail.com" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-smooth" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href="tel:+61493174934" className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-smooth" aria-label="Phone">
              <Phone size={18} />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Varghese John. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
