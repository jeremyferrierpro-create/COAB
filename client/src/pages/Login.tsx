import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { HeartHandshake, Info } from 'lucide-react';
import { cn } from '../lib/utils';

type RoleType = 'SENIOR' | 'JUNIOR' | 'VOLUNTEER';

export default function Login() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Register state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<RoleType>('JUNIOR');
  
  // Address
  const [streetNumber, setStreetNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erreur de connexion');
      }

      const data = await res.json();
      login(data.token, data.user);
      
      switch (data.user.role) {
        case 'ADMIN': navigate('/admin'); break;
        case 'SENIOR': navigate('/senior'); break;
        case 'VOLUNTEER': navigate('/volunteer'); break;
        case 'JUNIOR': navigate('/junior'); break;
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion. Vérifiez vos identifiants.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role, firstName, lastName })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erreur d\'inscription');
      }

      const data = await res.json();
      login(data.token, data.user);

      // Profil incomplet => Onboarding
      navigate('/onboarding');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'enregistrement.');
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLoginView ? 'Connexion' : 'Inscription'} - COAB</title>
      </Helmet>
      <div className="min-h-screen bg-coab-cream flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="fixed inset-0 bg-[url('/images/senior2.webp')] bg-cover bg-center opacity-10 filter blur-sm"></div>

      <Card className={cn(
        "w-full mx-auto bg-white/80 backdrop-blur-xl shadow-2xl border-white/40 relative z-10 transition-all duration-500",
        isLoginView ? "max-w-md my-auto" : "max-w-2xl my-8"
      )}>
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <img src="/logo.jpg" alt="COAB Logo" className="w-24 h-24 object-cover rounded-full shadow-md border-4 border-white" />
          </div>
          <CardTitle className="text-2xl font-extrabold text-coab-black font-serif tracking-tight">
            Espace COAB
          </CardTitle>
          <CardDescription>
            {isLoginView ? "Entrez vos identifiants pour accéder à votre espace dédié." : "Créez votre compte pour commencer la cohabitation."}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Note explicative d'intelligence de routage */}
          <div className="bg-coab-blue/5 border border-coab-blue/20 rounded-xl p-4 mb-6 flex items-start space-x-3">
            <Info className="text-coab-blue shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-coab-gray leading-relaxed">
              <strong>Système de Routage Intelligent :</strong> COAB reconnaît automatiquement votre profil selon vos données d'enregistrement (Junior, Sénior, Bénévole ou Administrateur) et vous redirige vers votre espace personnel exclusif et sécurisé de manière invisible.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex bg-coab-cream/50 rounded-lg p-1 mb-6 border border-coab-cream-light">
            <button
              type="button"
              onClick={() => setIsLoginView(true)}
              className={cn(
                "flex-1 py-2 text-sm font-bold rounded-md transition-all",
                isLoginView ? "bg-white shadow-sm text-coab-blue" : "text-coab-gray hover:text-coab-black"
              )}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => setIsLoginView(false)}
              className={cn(
                "flex-1 py-2 text-sm font-bold rounded-md transition-all",
                !isLoginView ? "bg-white shadow-sm text-coab-blue" : "text-coab-gray hover:text-coab-black"
              )}
            >
              Créer un compte
            </button>
          </div>

          {isLoginView ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email-login"
                  type="email"
                  placeholder="nom@exemple.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                  className="bg-white/50"
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password-login"
                  type="password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="bg-white/50"
                />
              </div>
              
              {error && <p className="text-sm text-coab-red text-center font-medium">{error}</p>}

              <Button type="submit" className="w-full bg-coab-blue hover:bg-coab-blue-dark text-white font-bold py-6">
                Se connecter
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-coab-black uppercase tracking-wider border-b pb-2">Votre Profil</h3>
                
                {/* Custom Radio Group pour le rôle */}
                <div className="grid grid-cols-3 gap-3">
                  {(['SENIOR', 'JUNIOR', 'VOLUNTEER'] as RoleType[]).map((r) => (
                    <div 
                      key={r}
                      onClick={() => setRole(r)}
                      className={cn(
                        "cursor-pointer text-center py-3 px-2 rounded-xl border-2 transition-all",
                        role === r 
                          ? "border-coab-blue bg-coab-blue/5 text-coab-blue font-bold shadow-sm" 
                          : "border-gray-200 bg-white text-gray-500 hover:border-coab-blue/40"
                      )}
                    >
                      {r === 'SENIOR' && 'Sénior'}
                      {r === 'JUNIOR' && 'Junior / HTH'}
                      {r === 'VOLUNTEER' && 'Bénévole'}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-coab-black uppercase tracking-wider border-b pb-2">Informations Personnelles</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Prénom" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                  <Input placeholder="Nom" value={lastName} onChange={e => setLastName(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-coab-black uppercase tracking-wider border-b pb-2">Adresse Complète</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="N°" className="md:col-span-1" value={streetNumber} onChange={e => setStreetNumber(e.target.value)} required />
                  <Input placeholder="Nom de la rue" className="md:col-span-2" value={streetName} onChange={e => setStreetName(e.target.value)} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="Code Postal" className="md:col-span-1" value={zipCode} onChange={e => setZipCode(e.target.value)} required />
                  <Input placeholder="Ville" className="md:col-span-2" value={city} onChange={e => setCity(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-coab-black uppercase tracking-wider border-b pb-2">Contact & Sécurité</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="tel" placeholder="N° de Téléphone" value={phone} onChange={e => setPhone(e.target.value)} required />
                  <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="username" required />
                </div>
                <Input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" required minLength={8} />
              </div>

              <div className="flex items-start space-x-3 bg-coab-blue/5 p-4 rounded-lg border border-coab-blue/20">
                <input type="checkbox" id="rgpd-consent" required className="mt-1 w-5 h-5 accent-coab-blue" />
                <label htmlFor="rgpd-consent" className="text-sm text-coab-gray leading-relaxed">
                  J'accepte que mes données personnelles soient traitées dans le cadre de ma recherche de cohabitation, conformément à la <a href="#" className="text-coab-blue underline">Politique de Confidentialité</a>. (Conformité RGPD)
                </label>
              </div>

              <Button type="submit" className="w-full bg-coab-blue hover:bg-coab-blue-dark text-white font-bold py-6 text-lg">
                S'enregistrer
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
      </div>
    </>
  );
}
