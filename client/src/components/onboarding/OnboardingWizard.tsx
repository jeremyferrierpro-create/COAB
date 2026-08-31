import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sun, Home as HomeIcon, Users, Volume2, Check, ChevronRight, ChevronLeft, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import toast from 'react-hot-toast';

type Step = 1 | 2 | 3 | 4;

export default function OnboardingWizard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);

  // Data state
  const [sleepHabit, setSleepHabit] = useState<string>('');
  const [presencePattern, setPresencePattern] = useState<string>('');
  const [socialNeed, setSocialNeed] = useState<string>('');
  const [noiseTolerance, setNoiseTolerance] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const isSenior = user?.role === 'SENIOR';

  const handleNext = () => {
    if (step < 4) setStep((s) => (s + 1) as Step);
  };

  const handlePrev = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
  };

  const handleComplete = async () => {
    if (!user) return;
    
    // Mapping des états UI vers les Enums Prisma
    const sleepMap: Record<string, string> = {
      'Couche-tôt': 'EARLY_BIRD',
      'Oiseau de nuit': 'LATE_SLEEPER',
      'Variable': 'VARIABLE'
    };
    
    const presenceMap: Record<string, string> = {
      'Très présent': 'HIGH',
      'Horaires de bureau': 'MEDIUM',
      'Souvent absent': 'LOW'
    };
    
    const socialMap: Record<string, string> = {
      'Très indépendant': 'INDEPENDENT',
      'Équilibré': 'BALANCED',
      'Très sociable': 'HIGHLY_SOCIAL'
    };
    
    const noiseMap: Record<string, string> = {
      'Silence absolu': 'LOW',
      'Bruit de fond (TV)': 'MEDIUM',
      'Ne craint pas le bruit': 'HIGH'
    };

    const serviceMap: Record<string, string> = {
      'Présence nocturne': 'NIGHT_PRESENCE',
      'Aide aux courses': 'GROCERY_HELP',
      'Aide informatique': 'IT_HELP',
      'Jardinage': 'GARDENING',
      'Promenade animal': 'PET_WALKING',
      'Temps de discussion': 'COMPANY',
      'Aide administrative': 'HOMEWORK_HELP'
    };

    const mappedServices = selectedServices.map(s => serviceMap[s]).filter(Boolean);

    const payload = {
      sleepHabit: sleepMap[sleepHabit],
      presencePattern: presenceMap[presencePattern],
      socialNeed: socialMap[socialNeed],
      noiseTolerance: noiseMap[noiseTolerance],
      ...(isSenior ? { requiredServices: mappedServices } : { offeredServices: mappedServices })
    };

    try {
      const res = await fetch(`http://localhost:3000/api/users/${user.id}/onboarding`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('coab_token')}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la sauvegarde du profil');
      }

      // Redirection après succès
      navigate(`/${user?.role.toLowerCase()}`);
    } catch (error) {
      console.error("Erreur Onboarding:", error);
      toast.error("Une erreur est survenue lors de la finalisation.");
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  return (
    <div className="min-h-screen bg-coab-cream flex items-center justify-center p-4 relative overflow-hidden">
      <Helmet>
        <title>Onboarding - COAB</title>
      </Helmet>
      {/* Design Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coab-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-coab-orange/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10">
        
        {/* Progress Bar (simplifiée) */}
        <div className="flex justify-between items-center mb-8 px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className={cn(
              "flex-1 h-3 rounded-full mx-1 transition-all duration-500",
              step >= s ? "bg-coab-blue" : "bg-coab-cream-light"
            )} />
          ))}
        </div>

        {/* Wizard Card */}
        <Card className="bg-white/90 backdrop-blur-xl shadow-2xl border-white/50 overflow-hidden min-h-[500px] flex flex-col">
          <CardContent className="p-10 flex-1 flex flex-col justify-center">
            
            {/* Step 1 : Rythme de vie */}
            <div className={cn("transition-opacity duration-500 space-y-8", step === 1 ? "block opacity-100" : "hidden opacity-0")}>
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-extrabold text-coab-black">Quel est votre rythme de vie ?</h2>
                <p className="text-coab-gray">Ces informations aideront l'algorithme à trouver une personne compatible.</p>
              </div>

              <div className="bg-coab-cream p-4 rounded-lg border border-coab-orange/20 mb-6 flex items-start space-x-3">
                <Info className="text-coab-orange shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-coab-gray leading-relaxed text-left">
                  <strong>Transparence & RGPD :</strong> Les informations comportementales collectées ci-dessous (sommeil, présence, caractère) sont strictement nécessaires à notre algorithme de matching pour vous proposer des profils compatibles. Elles ne seront jamais partagées à des tiers à des fins commerciales.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div id="sleep-label" className="font-bold text-coab-black-light flex items-center"><Sun className="mr-2" size={18} /> Sommeil</div>
                  <div className="grid grid-cols-3 gap-4" role="radiogroup" aria-labelledby="sleep-label">
                    {['Couche-tôt', 'Oiseau de nuit', 'Variable'].map(h => (
                      <button 
                        key={h} 
                        onClick={() => setSleepHabit(h)} 
                        role="radio" 
                        aria-checked={sleepHabit === h}
                        className={cn("p-4 rounded-xl border-2 transition-all font-bold", sleepHabit === h ? "border-coab-blue bg-coab-blue/10 text-coab-blue-dark" : "border-gray-200 text-gray-700 hover:border-coab-blue/40")}>
                        {h}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div id="presence-label" className="font-bold text-coab-black-light flex items-center"><HomeIcon className="mr-2" size={18} /> Présence au domicile</div>
                  <div className="grid grid-cols-3 gap-4" role="radiogroup" aria-labelledby="presence-label">
                    {['Très présent', 'Horaires de bureau', 'Souvent absent'].map(p => (
                      <button 
                        key={p} 
                        onClick={() => setPresencePattern(p)} 
                        role="radio" 
                        aria-checked={presencePattern === p}
                        className={cn("p-4 rounded-xl border-2 transition-all font-bold", presencePattern === p ? "border-coab-blue bg-coab-blue/10 text-coab-blue-dark" : "border-gray-200 text-gray-700 hover:border-coab-blue/40")}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 : Caractère et Indépendance */}
            <div className={cn("transition-opacity duration-500 space-y-8", step === 2 ? "block opacity-100" : "hidden opacity-0")}>
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-extrabold text-coab-black">Caractère & Indépendance</h2>
                <p className="text-coab-gray">Trouvons l'équilibre parfait entre partage et intimité.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div id="social-label" className="font-bold text-coab-black-light flex items-center"><Users className="mr-2" size={18} /> Besoin Social</div>
                  <div className="grid grid-cols-3 gap-4" role="radiogroup" aria-labelledby="social-label">
                    {['Très indépendant', 'Équilibré', 'Très sociable'].map(s => (
                      <button 
                        key={s} 
                        onClick={() => setSocialNeed(s)} 
                        role="radio" 
                        aria-checked={socialNeed === s}
                        className={cn("p-4 rounded-xl border-2 transition-all font-bold", socialNeed === s ? "border-coab-orange bg-coab-orange/10 text-coab-orange-dark" : "border-gray-200 text-gray-700 hover:border-coab-orange/40")}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div id="noise-label" className="font-bold text-coab-black-light flex items-center"><Volume2 className="mr-2" size={18} /> Tolérance au bruit</div>
                  <div className="grid grid-cols-3 gap-4" role="radiogroup" aria-labelledby="noise-label">
                    {['Silence absolu', 'Bruit de fond (TV)', 'Ne craint pas le bruit'].map(n => (
                      <button 
                        key={n} 
                        onClick={() => setNoiseTolerance(n)} 
                        role="radio" 
                        aria-checked={noiseTolerance === n}
                        className={cn("p-4 rounded-xl border-2 transition-all font-bold", noiseTolerance === n ? "border-coab-orange bg-coab-orange/10 text-coab-orange-dark" : "border-gray-200 text-gray-700 hover:border-coab-orange/40")}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 : Contrat Solidaire (Services) */}
            <div className={cn("transition-opacity duration-500 space-y-8", step === 3 ? "block opacity-100" : "hidden opacity-0")}>
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-extrabold text-coab-black">Le Contrat Solidaire</h2>
                <p className="text-coab-gray">
                  {isSenior ? "Quels sont les services ou coups de main dont vous auriez besoin ?" : "Quels services êtes-vous prêt à offrir en échange d'un loyer modéré ?"}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4" role="group" aria-label="Services solidaires">
                {[
                  'Présence nocturne', 'Aide aux courses', 'Aide informatique', 
                  'Jardinage', 'Promenade animal', 'Temps de discussion', 'Aide administrative'
                ].map(service => (
                  <button 
                    key={service} 
                    onClick={() => toggleService(service)} 
                    role="checkbox"
                    aria-checked={selectedServices.includes(service)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all font-bold flex items-center justify-between", 
                      selectedServices.includes(service) ? "border-coab-green bg-coab-green/10 text-coab-green-dark" : "border-gray-200 text-gray-700 hover:border-coab-green/40"
                    )}
                  >
                    <span>{service}</span>
                    {selectedServices.includes(service) && <Check size={18} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4 : Validation */}
            <div className={cn("transition-opacity duration-500 space-y-8 text-center", step === 4 ? "block opacity-100" : "hidden opacity-0")}>
              <div className="w-24 h-24 bg-coab-green/20 text-coab-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={48} />
              </div>
              <h2 className="text-4xl font-extrabold text-coab-black">Profil Complété à 100% !</h2>
              <p className="text-xl text-coab-gray max-w-lg mx-auto leading-relaxed">
                Merci d'avoir pris le temps de configurer vos affinités. Notre algorithme de matching est maintenant capable de vous trouver le binôme parfait.
              </p>
            </div>

          </CardContent>

          {/* Navigation Buttons */}
          <div className="bg-gray-50/80 p-6 flex justify-between border-t border-gray-100">
            {step > 1 && step < 4 ? (
              <Button variant="outline" onClick={handlePrev} className="px-6 py-6 font-bold text-gray-600">
                <ChevronLeft className="mr-2" /> Précédent
              </Button>
            ) : <div></div>}

            {step < 4 ? (
              <Button 
                className="bg-coab-blue hover:bg-coab-blue-dark text-white px-8 py-6 font-bold text-lg rounded-xl shadow-lg"
                onClick={handleNext}
                disabled={(step === 1 && (!sleepHabit || !presencePattern)) || (step === 2 && (!socialNeed || !noiseTolerance))}
              >
                Continuer <ChevronRight className="ml-2" />
              </Button>
            ) : (
              <Button 
                className="bg-coab-green hover:bg-[#1faa74] text-white px-12 py-6 font-bold text-xl rounded-xl shadow-lg mx-auto"
                onClick={handleComplete}
              >
                Accéder à mon espace
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
