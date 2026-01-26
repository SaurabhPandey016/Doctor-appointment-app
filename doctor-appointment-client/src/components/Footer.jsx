import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-t from-slate-950 to-slate-900/70 border-t border-emerald-900/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="../public/logo-single.png" alt="MediMeet" className="h-10 w-10 rounded-lg" />
              <div>
                <span className="font-bold text-white">Medi</span>
                <span className="font-bold text-emerald-400">Meet</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm">Connecting patients with trusted healthcare professionals for quality consultations.</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-emerald-400 transition-colors">Find Doctors</Link></li>
              <li><Link to="/appointments" className="text-slate-400 hover:text-emerald-400 transition-colors">My Appointments</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Terms</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="h-4 w-4 text-emerald-400" />
                +918720026790
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="h-4 w-4 text-emerald-400" />
                support@medimeet.com
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <MapPin className="h-4 w-4 text-emerald-400" />
                123 Health St, Medical City
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-900/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-500 text-sm text-center md:text-left">© {currentYear} MediMeet. All rights reserved.</p>
          <p className="text-slate-500 text-sm text-center md:text-left">Made with ❤️ by Saurabh Pandey</p> 
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
