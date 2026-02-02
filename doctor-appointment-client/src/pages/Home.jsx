import { features, testimonials } from '@/lib/data'
import { SPECIALTIES } from '@/lib/specialities'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
// Import mockDoctors as a named export (it's an object in Services.jsx)
import { mockDoctors } from './Services'

// Convert mockDoctors object to a flat array of all available doctors
// mockDoctors is a keyed object like { 'Cardiology': [...], 'General Medicine': [...] }
// Object.values() extracts all arrays, .flat() combines them into one array for easier mapping
const allDoctorsArray = Object.values(mockDoctors).flat()

function Feature({ f }) {
  return (
    <div className="border border-emerald-900/20 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 p-6 hover:border-emerald-700/40 hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
      <div className="text-4xl mb-4">{f.icon}</div>
      <h4 className="font-semibold text-white mb-2 text-lg">{f.title}</h4>
      <p className="text-sm text-slate-400">{f.description}</p>
    </div>
  )
}

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-emerald-900/20 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-900/30 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-emerald-500/5 transition-all"
      >
        <h3 className="text-white font-semibold text-left">{question}</h3>
        <ChevronDown className={`h-5 w-5 text-emerald-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-emerald-900/20 bg-slate-900/20">
          <p className="text-slate-400 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { token } = useSelector(state => state.auth)
  const [openFAQ, setOpenFAQ] = useState(0)

  const handleGetStarted = () => {
    if (token) {
      navigate('/services')
    } else {
      navigate('/login')
    }
  }

  const faqs = [
    {
      question: "How do I book an appointment with a doctor?",
      answer: "Simply browse our list of available doctors, select your preferred specialty, choose a convenient date and time, and book your appointment in just a few clicks. You'll receive a confirmation immediately."
    },
    {
      question: "Can I upload my medical reports and health documents?",
      answer: "Yes! You can upload medical reports, test results, and other documents in PDF, JPEG, PNG, or DOC format (up to 15MB) directly to your appointments. Your doctor can review them before your consultation."
    },
    {
      question: "Is my personal and medical information secure?",
      answer: "Absolutely. We use industry-standard encryption and security protocols to protect all your personal and medical data. Your privacy is our top priority, and we comply with all healthcare data protection regulations."
    },
    {
      question: "Can I reschedule or cancel my appointment?",
      answer: "Yes, you can cancel any appointment from your appointments page. For rescheduling, please cancel your current appointment and book a new one at your preferred date and time."
    },
    {
      question: "What should I do if I need urgent medical assistance?",
      answer: "For medical emergencies, please contact your local emergency services immediately. MediMeet is designed for scheduling regular consultations. Always prioritize emergency medical care in critical situations."
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-emerald-900/20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-slate-900/50" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Find <span className="text-emerald-400">trusted doctors</span> near you
              </h1>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Book appointments, consult online and manage your health records with ease. Connect with verified healthcare professionals from the comfort of your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/30"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </button>
                <Link 
                  to="/services" 
                  className="border-2 border-emerald-500/50 hover:border-emerald-500 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 font-semibold px-8 py-3 rounded-lg transition-all text-center"
                >
                  Browse Services
                </Link>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm h-96 rounded-2xl overflow-hidden border border-emerald-900/30 shadow-2xl shadow-emerald-500/10">
                <img 
                  src="../banner2.png" 
                  alt="MediMeet Banner" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/logo-single.png'
                    e.target.className = 'w-full h-full object-contain bg-gradient-to-br from-emerald-500/20 to-emerald-900/20'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="bg-slate-900/50 py-16 border-b border-emerald-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-2">Medical Specialties</h2>
            <p className="text-slate-400">Browse our range of healthcare specialties</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {SPECIALTIES.slice(0, 12).map(s => (
              <button
                key={s.name}
                onClick={() => navigate('/services')}
                className="border-2 border-emerald-900/30 rounded-xl p-5 bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-center group"
              >
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-200">{s.icon}</div>
                <div className="text-xs font-semibold text-slate-300 group-hover:text-emerald-300 transition-colors">{s.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Why Choose MediMeet</h2>
          <p className="text-slate-400">Quality healthcare at your fingertips</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Feature key={i} f={f} />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 py-16 border-t border-emerald-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-2">Patient Success Stories</h2>
            <p className="text-slate-400">Join thousands of satisfied patients</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-emerald-900/30 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 p-6 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10">
                <div className="flex items-start mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                
                <p className="text-slate-300 mb-6 italic">"{t.quote}"</p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-slate-700/50">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-900/30 flex items-center justify-center border border-emerald-500/50 font-bold text-emerald-400">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="container mx-auto px-4 py-16 border-t border-emerald-900/20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          <p className="text-slate-400">Find answers to common questions about our services</p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFAQ === index}
              onToggle={() => setOpenFAQ(openFAQ === index ? -1 : index)}
            />
          ))}
        </div>
      </section>

      {/* CTA Section - No bottom margin to eliminate white gap above footer (footer is in separate flex container) */}
      <section className="container mx-auto px-4 py-16 mb-0">
        <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to get better health?</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Start your health journey today with MediMeet. Find your perfect doctor and book an appointment in minutes.
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-10 py-3 rounded-lg transition-all inline-flex items-center gap-2"
          >
            Find a Doctor
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </main>
  )
}

  // const handleGetStarted = () => {
  //   if (token) {
  //     navigate('/services')
  //   } else {
  //     navigate('/login')
  //   }
  // }

  // return (
  //   <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
  //     {/* Hero Section */}
  //     <section className="relative overflow-hidden border-b border-emerald-900/20">
  //       <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-slate-900/50" />
        
  //       <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
  //         <div className="grid md:grid-cols-2 gap-12 items-center">
  //           <div>
  //             <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
  //               Find <span className="text-emerald-400">trusted doctors</span> near you
  //             </h1>
  //             <p className="text-slate-400 text-lg mb-8 leading-relaxed">
  //               Book appointments, consult online and manage your health records with ease. Connect with verified healthcare professionals from the comfort of your home.
  //             </p>
  //             <div className="flex flex-col sm:flex-row gap-4">
  //               <button 
  //                 onClick={handleGetStarted}
  //                 className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/30"
  //               >
  //                 Get Started
  //                 <ArrowRight className="h-5 w-5" />
  //               </button>
  //               <Link 
  //                 to="/services" 
  //                 className="border-2 border-emerald-500/50 hover:border-emerald-500 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 font-semibold px-8 py-3 rounded-lg transition-all text-center"
  //               >
  //                 Browse Services
  //               </Link>
  //             </div>
  //           </div>
            
  //           <div className="flex items-center justify-center">
  //             <div className="w-full max-w-sm h-96 rounded-2xl overflow-hidden border border-emerald-900/30 shadow-2xl shadow-emerald-500/10">
  //               <img 
  //                 src="../public/banner2.png" 
  //                 alt="MediMeet Banner" 
  //                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
  //                 onError={(e) => {
  //                   e.target.src = '/logo-single.png'
  //                   e.target.className = 'w-full h-full object-contain bg-gradient-to-br from-emerald-500/20 to-emerald-900/20'
  //                 }}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>

  //     {/* Specialties Section */}
  //     <section className="bg-slate-900/50 py-16 border-b border-emerald-900/20">
  //       <div className="container mx-auto px-4">
  //         <div className="text-center mb-12">
  //           <h2 className="text-4xl font-bold text-white mb-2">Medical Specialties</h2>
  //           <p className="text-slate-400">Browse our range of healthcare specialties</p>
  //         </div>
          
  //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
  //           {SPECIALTIES.slice(0, 12).map(s => (
  //             <button
  //               key={s.name}
  //               onClick={() => navigate('/services')}
  //               className="border-2 border-emerald-900/30 rounded-xl p-5 bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-center group"
  //             >
  //               <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-200">{s.icon}</div>
  //               <div className="text-xs font-semibold text-slate-300 group-hover:text-emerald-300 transition-colors">{s.name}</div>
  //             </button>
  //           ))}
  //         </div>
  //       </div>
  //     </section>

  //     {/* Features Section */}
  //     <section className="container mx-auto px-4 py-16">
  //       <div className="text-center mb-12">
  //         <h2 className="text-4xl font-bold text-white mb-2">Why Choose MediMeet</h2>
  //         <p className="text-slate-400">Quality healthcare at your fingertips</p>
  //       </div>
        
  //       <div className="grid md:grid-cols-3 gap-6">
  //         {features.map((f, i) => (
  //           <Feature key={i} f={f} />
  //         ))}
  //       </div>
  //     </section>

  //     {/* Testimonials Section */}
  //     <section className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 py-16 border-t border-emerald-900/20">
  //       <div className="container mx-auto px-4">
  //         <div className="text-center mb-12">
  //           <h2 className="text-4xl font-bold text-white mb-2">Patient Success Stories</h2>
  //           <p className="text-slate-400">Join thousands of satisfied patients</p>
  //         </div>
          
  //         <div className="grid md:grid-cols-3 gap-6">
  //           {testimonials.map((t, i) => (
  //             <div key={i} className="border border-emerald-900/30 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 p-6 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10">
  //               <div className="flex items-start mb-4">
  //                 {[...Array(5)].map((_, i) => (
  //                   <span key={i} className="text-yellow-400">⭐</span>
  //                 ))}
  //               </div>
                
  //               <p className="text-slate-300 mb-6 italic">"{t.quote}"</p>
                
  //               <div className="flex items-center gap-4 pt-6 border-t border-slate-700/50">
  //                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-900/30 flex items-center justify-center border border-emerald-500/50 font-bold text-emerald-400">
  //                   {t.initials}
  //                 </div>
  //                 <div>
  //                   <div className="text-white font-semibold">{t.name}</div>
  //                   <div className="text-xs text-slate-400">{t.role}</div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </section>

  //     {/* CTA Section - No bottom margin to eliminate white gap above footer (footer is in separate flex container) */}
  //     <section className="container mx-auto px-4 py-16 mb-0">
  //       <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-2xl p-12 text-center">
  //         <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to get better health?</h2>
  //         <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
  //           Start your health journey today with MediMeet. Find your perfect doctor and book an appointment in minutes.
  //         </p>
  //         <button 
  //           onClick={handleGetStarted}
  //           className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-10 py-3 rounded-lg transition-all inline-flex items-center gap-2"
  //         >
  //           Find a Doctor
  //           <ArrowRight className="h-5 w-5" />
  //         </button>
  //       </div>
  //     </section>
  //   </main>
  // )

