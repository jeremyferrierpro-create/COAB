import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
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

    // MOCK LOGIN TEMPORAIRE (Smart Auth)
    if (password === 'password123') {
      const mockUser = {
        id: '123',
        email: email,
        firstName: 'Utilisateur',
        lastName: 'Test',
        role: 'JUNIOR' as any
      };

      if (email.includes('admin')) mockUser.role = 'ADMIN';
      if (email.includes('senior')) mockUser.role = 'SENIOR';
      if (email.includes('volunteer')) mockUser.role = 'VOLUNTEER';

      login('dummy-token', mockUser);
      
      switch (mockUser.role) {
        case 'ADMIN': navigate('/admin'); break;
        case 'SENIOR': navigate('/senior'); break;
        case 'VOLUNTEER': navigate('/volunteer'); break;
        case 'JUNIOR': navigate('/junior'); break;
      }
    } else {
      setError('Identifiants incorrects (Indice: essayez admin@coab.fr / password123)');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simulation de l'enregistrement en base de données et connexion automatique
    const mockUser = {
      id: '999',
      email: email,
      firstName: firstName,
      lastName: lastName,
      role: role
    };

    login('dummy-token-registered', mockUser);

    // Routage intelligent basé sur le rôle choisi
    switch (role) {
      case 'SENIOR': navigate('/senior'); break;
      case 'VOLUNTEER': navigate('/volunteer'); break;
      case 'JUNIOR': navigate('/junior'); break;
    }
  };

  return (
    <div className="min-h-screen bg-coab-cream flex items-center justify-center p-4 overflow-y-auto relative">
      {/* Background decoration */}
      <div className="fixed inset-0 bg-[url('/images/senior2.webp')] bg-cover bg-center opacity-10 filter blur-sm"></div>

      <Card className={cn(
        "w-full bg-white/80 backdrop-blur-xl shadow-2xl border-white/40 relative z-10 transition-all duration-500",
        isLoginView ? "max-w-md my-auto" : "max-w-2xl my-8"
      )}>
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 bg-coab-blue/10 text-coab-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <HeartHandshake size={32} />
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
                  <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <Input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
              </div>

              <Button type="submit" className="w-full bg-coab-blue hover:bg-coab-blue-dark text-white font-bold py-6 text-lg">
                S'enregistrer
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
