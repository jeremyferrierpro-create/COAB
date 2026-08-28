import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card"
import { Home as HomeIcon, User, HeartHandshake, ShieldCheck, FileCheck, Users, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "../lib/utils"

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const sectionsCount = 3 // 0: Hero, 1: Valeurs, 2: Parcours

  // Gestionnaire de défilement (Wheel & Touch)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return
      setIsScrolling(true)
      
      if (e.deltaY > 0 && activeSection < sectionsCount - 1) {
        setActiveSection(prev => prev + 1)
      } else if (e.deltaY < 0 && activeSection > 0) {
        setActiveSection(prev => prev - 1)
      }
      
      setTimeout(() => setIsScrolling(false), 800) // Lock duration
    }

    // Touch support
    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) return
      const touchEndY = e.touches[0].clientY
      const diff = touchStartY - touchEndY

      if (Math.abs(diff) > 50) { // Threshold
        setIsScrolling(true)
        if (diff > 0 && activeSection < sectionsCount - 1) {
          setActiveSection(prev => prev + 1)
        } else if (diff < 0 && activeSection > 0) {
          setActiveSection(prev => prev - 1)
        }
        setTimeout(() => setIsScrolling(false), 800)
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [activeSection, isScrolling])

  // Prevent default scroll on body
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const nextSection = () => {
    if (activeSection < sectionsCount - 1) setActiveSection(prev => prev + 1)
  }

  const prevSection = () => {
    if (activeSection > 0) setActiveSection(prev => prev - 1)
  }

  return (
    <div className="h-screen w-full bg-coab-cream font-sans overflow-hidden relative flex flex-col">
      
      {/* Header Fixe */}
      <nav className="absolute top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-coab-cream-light px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-2">
          <HeartHandshake className="text-coab-blue h-8 w-8" />
          <span className="text-2xl font-serif font-extrabold text-coab-black tracking-tight">COAB</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/login">
            <Button className="bg-coab-blue text-white hover:bg-coab-blue-dark">Connexion / Inscription</Button>
          </Link>
        </div>
      </nav>

      {/* Conteneur principal plein écran avec transitions en fondu */}
      <main className="flex-1 relative w-full h-full pt-20 pb-16">
        
        {/* Section 0: Hero */}
        <section 
          className={cn(
            "absolute inset-0 flex items-center px-8 md:px-12 lg:px-24 transition-opacity duration-700 ease-in-out",
            activeSection === 0 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          )}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-extrabold text-coab-black leading-tight">
                La cohabitation <span className="text-coab-blue">solidaire</span> en Ariège.
              </h1>
              <p className="text-xl text-coab-gray max-w-lg">
                COAB connecte les générations. Trouvez un logement abordable ou rompez l'isolement en partageant votre quotidien, en toute sécurité, encadré par la charte Cohabilis.
              </p>
              <div className="pt-4">
                <Button onClick={nextSection} size="lg" className="w-full sm:w-auto bg-coab-orange hover:bg-coab-orange-dark text-white font-bold py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                  Découvrir nos solutions
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-coab-blue/20 rounded-[3rem] transform rotate-3"></div>
              <img 
                src="/images/senior2.webp" 
                alt="Un senior souriant partageant un moment avec un jeune" 
                className="relative z-10 rounded-[3rem] shadow-2xl object-cover h-[500px] w-full"
              />
            </div>
          </div>
        </section>

        {/* Section 1: Valeurs & Impact */}
        <section 
          className={cn(
            "absolute inset-0 flex items-center justify-center px-8 md:px-12 lg:px-24 bg-white transition-opacity duration-700 ease-in-out",
            activeSection === 1 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          )}
        >
          <div className="max-w-7xl mx-auto text-center space-y-12 w-full">
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold text-coab-black">Pourquoi nous faire confiance ?</h2>
              <p className="text-xl text-coab-gray max-w-2xl mx-auto">Un accompagnement humain, de A à Z, pour une cohabitation sereine.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 space-y-4 rounded-3xl bg-coab-cream border border-coab-cream-light shadow-sm">
                <div className="w-20 h-20 bg-coab-blue/10 text-coab-blue rounded-full flex items-center justify-center mx-auto">
                  <Users size={40} />
                </div>
                <h3 className="text-2xl font-bold text-coab-black">Matching Sur-Mesure</h3>
                <p className="text-coab-gray">Notre algorithme ultra-spécialisé croise vos affinités et modes de vie pour vous proposer le binôme idéal.</p>
              </div>
              
              <div className="p-8 space-y-4 rounded-3xl bg-coab-cream border border-coab-cream-light shadow-sm">
                <div className="w-20 h-20 bg-coab-green/10 text-coab-green rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck size={40} />
                </div>
                <h3 className="text-2xl font-bold text-coab-black">Suivi Personnalisé</h3>
                <p className="text-coab-gray">Nos bénévoles assurent des visites régulières pour garantir la bonne entente et la santé du binôme.</p>
              </div>

              <div className="p-8 space-y-4 rounded-3xl bg-coab-cream border border-coab-cream-light shadow-sm">
                <div className="w-20 h-20 bg-coab-orange/10 text-coab-orange rounded-full flex items-center justify-center mx-auto">
                  <FileCheck size={40} />
                </div>
                <h3 className="text-2xl font-bold text-coab-black">Cadre Sécurisé</h3>
                <p className="text-coab-gray">Tous les contrats (Loi ELAN) et la charte Cohabilis sont générés et signés électroniquement via notre plateforme.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Parcours Utilisateurs */}
        <section 
          className={cn(
            "absolute inset-0 flex items-center justify-center px-8 md:px-12 lg:px-24 bg-coab-cream transition-opacity duration-700 ease-in-out",
            activeSection === 2 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          )}
        >
          <div className="max-w-6xl mx-auto space-y-12 w-full">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-extrabold text-coab-black">Quel est votre profil ?</h2>
              <p className="text-xl text-coab-gray">Inscrivez-vous en 3 minutes pour commencer l'aventure.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white border-2 border-transparent hover:border-coab-blue/30 transition-all shadow-xl hover:shadow-2xl rounded-3xl overflow-hidden transform hover:-translate-y-2">
                <img src="/images/senior3.jpeg" alt="Sénior accueillant" className="h-56 w-full object-cover" />
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <CardTitle className="text-3xl text-coab-blue-dark flex items-center">
                      <HomeIcon className="mr-3" /> Accueillant (Sénior)
                    </CardTitle>
                    <CardDescription className="text-lg">Vous disposez d'une chambre libre.</CardDescription>
                  </div>
                  <p className="text-coab-black-light text-lg">
                    Accueillez un jeune chez vous. Bénéficiez d'une présence, de menus services, ou d'un revenu complémentaire, tout en gardant votre indépendance.
                  </p>
                  <Link to="/register/senior" className="block pt-4">
                    <Button variant="senior" size="lg" className="w-full rounded-xl py-6 font-bold text-lg">
                      Proposer mon logement
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card className="bg-white border-2 border-transparent hover:border-coab-orange/30 transition-all shadow-xl hover:shadow-2xl rounded-3xl overflow-hidden transform hover:-translate-y-2">
                <img src="/images/senior1.webp" alt="Jeune et sénior" className="h-56 w-full object-cover" />
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <CardTitle className="text-3xl text-coab-orange-dark flex items-center">
                      <User className="mr-3" /> Hébergé (Junior / HTH)
                    </CardTitle>
                    <CardDescription className="text-lg">18-30 ans ou situation d'urgence.</CardDescription>
                  </div>
                  <p className="text-coab-black-light text-lg">
                    Trouvez un logement abordable et chaleureux. Idéal pour les étudiants, alternants, ou les personnes en recherche d'habitat temporaire (HTH).
                  </p>
                  <Link to="/register/junior" className="block pt-4">
                    <Button variant="junior" size="lg" className="w-full rounded-xl py-6 font-bold text-lg">
                      Chercher un logement
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

      </main>

      {/* Navigation Indicateurs */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-50">
        {[0, 1, 2].map((idx) => (
          <button 
            key={idx}
            onClick={() => setActiveSection(idx)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              activeSection === idx ? "bg-coab-blue scale-150" : "bg-coab-gray/40 hover:bg-coab-gray"
            )}
            aria-label={`Aller à la section ${idx + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll controls (Bottom Center) */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 z-50">
        <span className="text-xs text-coab-gray font-bold tracking-widest uppercase">Scroll</span>
        <div className="flex space-x-2">
          <button 
            onClick={prevSection} 
            disabled={activeSection === 0}
            className="p-2 rounded-full bg-white/50 backdrop-blur-sm border border-coab-cream-light shadow-sm disabled:opacity-30 transition-all hover:bg-white"
          >
            <ChevronUp size={20} className="text-coab-black" />
          </button>
          <button 
            onClick={nextSection} 
            disabled={activeSection === sectionsCount - 1}
            className="p-2 rounded-full bg-white/50 backdrop-blur-sm border border-coab-cream-light shadow-sm disabled:opacity-30 transition-all hover:bg-white animate-bounce"
          >
            <ChevronDown size={20} className="text-coab-black" />
          </button>
        </div>
      </div>

      {/* Footer Fixe */}
      <footer className="absolute bottom-0 w-full bg-coab-black/95 backdrop-blur-lg text-white py-4 px-8 text-center flex justify-between items-center z-50 h-16">
        <p className="text-coab-gray/80 text-sm">© 2026 Association COAB - Réseau Cohabilis.</p>
        <div className="flex space-x-4 text-sm text-coab-gray/60">
          <Link to="/mentions" className="hover:text-white transition-colors">Mentions Légales</Link>
          <Link to="/cgu" className="hover:text-white transition-colors">CGU & RGPD</Link>
        </div>
      </footer>
    </div>
  )
}
