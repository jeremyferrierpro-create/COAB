import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/Card';
import { Users, FileText, Settings, HeartHandshake, CreditCard, Activity, Calendar, MessageSquare, Plus, FileSignature, CheckCircle, Clock, UserPlus, Edit, Eye, Trash2 } from 'lucide-react';
import { AddUserAdminModal } from '../../components/admin/AddUserAdminModal';
import { EditUserAdminModal } from '../../components/admin/EditUserAdminModal';
import { ViewUserAdminModal } from '../../components/admin/ViewUserAdminModal';
import { SetupContractModal } from '../../components/admin/SetupContractModal';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';

export function AdminDashboard() {
  const kpis = [
    { label: 'Binômes Actifs', value: '42', icon: HeartHandshake, color: 'text-coab-green' },
    { label: 'Inscrits en Attente', value: '18', icon: Users, color: 'text-coab-orange' },
    { label: 'Trésorerie Globale', value: '14 500 €', icon: Wallet, color: 'text-coab-blue' },
    { label: 'Taux de Matching', value: '85 %', icon: TrendingUp, color: 'text-coab-black' },
  ];

  const dataRegistration = [
    { month: 'Jan', Seniors: 4, Juniors: 10 },
    { month: 'Fév', Seniors: 6, Juniors: 12 },
    { month: 'Mar', Seniors: 8, Juniors: 15 },
    { month: 'Avr', Seniors: 12, Juniors: 20 },
    { month: 'Mai', Seniors: 15, Juniors: 22 },
  ];

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Tableau de Bord - Admin COAB</title>
      </Helmet>
      <h1 className="text-3xl font-extrabold text-coab-black font-sans">Tour de Contrôle</h1>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-md border-white/40 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-coab-gray uppercase tracking-wider">{kpi.label}</p>
                <p className={`text-3xl font-extrabold mt-1 ${kpi.color}`}>{kpi.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-50 ${kpi.color}`}>
                <kpi.icon size={24} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="bg-white/60 backdrop-blur-md border-white/40 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-coab-blue-dark">Évolution des Inscriptions</CardTitle>
          <CardDescription>Comparaison mensuelle entre les Séniors et les Juniors/HTH.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataRegistration} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="Seniors" fill="#4A9DB8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Juniors" fill="#F5A118" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}




export function AdminCRM() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [viewUserId, setViewUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('coab_token')}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) return;
    
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('coab_token')}`
        }
      });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== id));
        toast.success("Utilisateur supprimé avec succès");
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>CRM Utilisateurs - Admin COAB</title>
      </Helmet>
      
      <AddUserAdminModal 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
        onSuccess={fetchUsers} 
      />
      <EditUserAdminModal 
        isOpen={!!editUserId} 
        userId={editUserId as string}
        onClose={() => setEditUserId(null)} 
        onSuccess={fetchUsers} 
      />
      <ViewUserAdminModal 
        isOpen={!!viewUserId} 
        userId={viewUserId as string}
        onClose={() => setViewUserId(null)} 
      />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-coab-black font-sans">CRM / Utilisateurs</h1>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="flex items-center px-4 py-2 bg-coab-blue text-white rounded-lg font-bold text-sm hover:bg-coab-blue-dark transition-colors"
        >
          <UserPlus size={16} className="mr-2" /> Ajouter manuellement
        </button>
      </div>
      
      <Card className="bg-white/60 backdrop-blur-md border-white/40 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-coab-blue-dark">Gestion complète des dossiers</CardTitle>
          <CardDescription>Tous les Séniors, Juniors, et Bénévoles enregistrés sur COAB.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-10 text-coab-gray font-bold">Chargement des utilisateurs...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-10 text-coab-gray">Aucun utilisateur trouvé.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-sm font-bold text-coab-gray">ID</th>
                    <th className="pb-3 text-sm font-bold text-coab-gray">Nom complet</th>
                    <th className="pb-3 text-sm font-bold text-coab-gray">Rôle</th>
                    <th className="pb-3 text-sm font-bold text-coab-gray">Email</th>
                    <th className="pb-3 text-sm font-bold text-coab-gray">Profil Onboarding</th>
                    <th className="pb-3 text-sm font-bold text-coab-gray text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u: any) => {
                    const isComplete = (u.role === 'SENIOR' && u.seniorProfile?.isProfileComplete) ||
                                       (u.role === 'JUNIOR' && u.juniorProfile?.isProfileComplete);
                    
                    return (
                      <tr key={u.id} className="hover:bg-white/50 transition-colors">
                        <td className="py-4 font-mono text-xs text-gray-500">{u.id.substring(0, 8)}...</td>
                        <td className="py-4 font-bold text-coab-black">{u.firstName} {u.lastName}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            u.role === 'SENIOR' ? 'bg-coab-blue/20 text-coab-blue' : 
                            u.role === 'JUNIOR' ? 'bg-coab-orange/20 text-coab-orange' : 
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-gray-600">{u.email}</td>
                        <td className="py-4">
                          {['SENIOR', 'JUNIOR'].includes(u.role) ? (
                            <span className={`px-2 py-1 rounded text-xs font-bold ${isComplete ? 'bg-coab-green/20 text-coab-green' : 'bg-coab-red/20 text-coab-red'}`}>
                              {isComplete ? '100% Complété' : 'Incomplet'}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">N/A</span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              className="p-2 text-gray-500 hover:text-coab-blue transition-colors rounded-lg hover:bg-gray-50" 
                              aria-label="Consulter l'utilisateur"
                              onClick={() => setViewUserId(u.id)}
                            >
                              <Eye size={18} />
                            </button>
                            <button 
                              className="p-2 text-gray-500 hover:text-coab-orange transition-colors rounded-lg hover:bg-gray-50" 
                              aria-label="Éditer l'utilisateur"
                              onClick={() => setEditUserId(u.id)}
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              className="p-2 text-gray-500 hover:text-coab-red transition-colors rounded-lg hover:bg-gray-50" 
                              aria-label="Supprimer l'utilisateur"
                              onClick={() => handleDelete(u.id)}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminOperations() {
  const [seniors, setSeniors] = useState<any[]>([]);
  const [selectedSeniorId, setSelectedSeniorId] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeniors = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/users', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('coab_token')}` }
        });
        if (res.ok) {
          const data = await res.json();
          const availableSeniors = data.filter((u: any) => u.role === 'SENIOR' && u.seniorProfile?.isProfileComplete);
          setSeniors(availableSeniors);
        } else {
          toast.error("Impossible de récupérer la liste des Séniors.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Erreur de connexion au serveur (Séniors).");
      }
    };
    fetchSeniors();
  }, []);

  useEffect(() => {
    if (!selectedSeniorId) {
      setSuggestions([]);
      return;
    }
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const senior = seniors.find(s => s.id === selectedSeniorId);
        if (!senior || !senior.seniorProfile) return;
        
        const res = await fetch(`http://localhost:3000/api/matching/senior/${senior.seniorProfile.id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('coab_token')}` }
        });
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions || []);
        } else {
          toast.error("Erreur lors du calcul des suggestions");
        }
      } catch (err) {
        console.error(err);
        toast.error("Erreur réseau");
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [selectedSeniorId, seniors]);

  const handlePropose = async (juniorId: string, score: number) => {
    try {
      const senior = seniors.find(s => s.id === selectedSeniorId);
      if (!senior || !senior.seniorProfile) return;

      const payload = {
        seniorId: senior.seniorProfile.id,
        juniorId: juniorId,
        housingFormula: 'SOLIDAIRE',
        score
      };

      const res = await fetch('http://localhost:3000/api/matching/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('coab_token')}`
        },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        toast.success("Match proposé avec succès !");
      } else {
        const err = await res.json();
        toast.error(err.error || "Erreur lors de la création du match");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur réseau");
    }
  };

  const selectedSenior = seniors.find(s => s.id === selectedSeniorId);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-coab-black font-sans">Opérations & Matching</h1>
      
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <label className="font-bold text-coab-gray">Sélectionner un Sénior :</label>
        <select 
          className="border border-gray-300 rounded p-2 bg-white flex-1 max-w-md"
          value={selectedSeniorId}
          onChange={(e) => setSelectedSeniorId(e.target.value)}
        >
          <option value="">-- Choisir un profil sénior --</option>
          {seniors.map(s => (
            <option key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.city || 'Ville inconnue'})</option>
          ))}
        </select>
      </div>

      {selectedSeniorId && (
        <Card className="bg-white/60 backdrop-blur-md border-white/40 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-coab-blue-dark">
              Recherche de Binôme pour {selectedSenior?.firstName} {selectedSenior?.lastName}
            </CardTitle>
            <CardDescription>
              L'algorithme ultra-spécialisé a analysé les profils Juniors compatibles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-gray-500 font-bold">Calcul des affinités en cours...</div>
            ) : suggestions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Aucun profil junior compatible trouvé.</div>
            ) : (
              suggestions.map((suggestion, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  {/* Info Junior */}
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-coab-cream flex items-center justify-center text-coab-blue font-bold text-lg">
                      {suggestion.junior.user.firstName.charAt(0)}{suggestion.junior.user.lastName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-coab-black text-lg">{suggestion.junior.user.firstName} {suggestion.junior.user.lastName}</h3>
                      <p className="text-coab-gray text-sm">{suggestion.junior.situation}</p>
                    </div>
                  </div>

                  {/* Raisons du Matching */}
                  <div className="flex-1 px-8 space-y-1 hidden md:block">
                    {suggestion.reasons.map((r: string, i: number) => (
                      <p key={i} className={`text-xs font-medium ${r.includes('Éliminatoire') || r.includes('Risque') || r.includes('Attention') ? 'text-coab-red' : 'text-coab-green'}`}>
                        • {r}
                      </p>
                    ))}
                  </div>

                  {/* Score & Action */}
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <span className={`text-3xl font-extrabold ${suggestion.score >= 80 ? 'text-coab-green' : suggestion.score >= 50 ? 'text-coab-orange' : 'text-coab-red'}`}>
                        {suggestion.score}%
                      </span>
                      <p className="text-[10px] text-coab-gray font-bold uppercase tracking-wider">Score Affinité</p>
                    </div>
                    
                    <button 
                      onClick={() => handlePropose(suggestion.junior.id, suggestion.score)}
                      disabled={suggestion.score === 0}
                      className={`px-6 py-2 rounded-lg font-bold text-sm text-white transition-colors ${suggestion.score === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-coab-blue hover:bg-coab-blue-dark'}`}
                    >
                      {suggestion.score === 0 ? 'Rejeté' : 'Proposer'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function AdminLegal() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/legal/matches', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('coab_token')}` }
      });
      if (res.ok) {
        setMatches(await res.json());
      }
    } catch (err) {
      console.error(err);
      toast.error('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const downloadDocument = async (url: string, filename: string, method: string = 'GET', body?: any) => {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('coab_token')}`,
          ...(body ? { 'Content-Type': 'application/json' } : {})
        },
        body: body ? JSON.stringify(body) : undefined
      };
      
      const res = await fetch(url, options);
      if (!res.ok) throw new Error('Erreur lors de la génération');
      
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(`Document ${filename} généré avec succès !`);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la génération du document.");
    }
  };

  const handleGenerateContract = (matchId: string) => {
    downloadDocument(`http://localhost:3000/api/legal/contract/${matchId}`, `Contrat_ELAN_${matchId}.pdf`);
  };

  const handleGenerateCharter = (matchId: string) => {
    downloadDocument(`http://localhost:3000/api/legal/charter/${matchId}`, `Charte_Cohabilis_${matchId}.pdf`);
  };

  const handleGenerateReceipt = (matchId: string) => {
    const period = prompt('Période (ex: Septembre 2026) :', 'Septembre 2026');
    if (!period) return;
    downloadDocument(`http://localhost:3000/api/legal/receipt/${matchId}`, `Quittance_${period}.pdf`, 'POST', { period });
  };

  const handleGenerateNotice = (matchId: string) => {
    const period = prompt('Période concernée (ex: Septembre 2026) :', 'Septembre 2026');
    if (!period) return;
    downloadDocument(`http://localhost:3000/api/legal/payment-notice/${matchId}`, `Avis_Paiement_${period}.pdf`, 'POST', { period });
  };

  return (
    <div className="space-y-6 relative">
      <h1 className="text-3xl font-extrabold text-coab-black font-sans">Pôle Juridique & Contrats</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-coab-blue shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-coab-gray font-bold uppercase text-xs tracking-wider">Dossiers en attente</h3>
            <p className="text-3xl font-extrabold text-coab-black mt-2">{matches.filter(m => m.status === 'SUGGESTED').length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-coab-green shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-coab-gray font-bold uppercase text-xs tracking-wider">Dossiers Actifs</h3>
            <p className="text-3xl font-extrabold text-coab-black mt-2">{matches.filter(m => m.status === 'ACTIVE' || m.status === 'TRIAL_PERIOD').length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm border-l-4 border-coab-orange shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-coab-gray font-bold uppercase text-xs tracking-wider">Quittances automatisables</h3>
            <p className="text-3xl font-extrabold text-coab-black mt-2">{matches.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/60 backdrop-blur-md border-white/40 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-coab-blue-dark">Gestion Documentaire des Binômes</CardTitle>
          <CardDescription>
            Générez intelligemment les contrats Loi ELAN, Chartes Cohabilis et suivis financiers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-10 font-bold text-gray-500">Chargement des dossiers...</div>
          ) : matches.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Aucun dossier actif ou en attente.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-sm font-bold text-coab-gray">Dossier</th>
                    <th className="pb-3 text-sm font-bold text-coab-gray">Sénior & Junior</th>
                    <th className="pb-3 text-sm font-bold text-coab-gray">Formule</th>
                    <th className="pb-3 text-sm font-bold text-coab-gray">Statut</th>
                    <th className="pb-3 text-sm font-bold text-coab-gray text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {matches.map(match => {
                    const seniorName = match.senior?.user ? `${match.senior.user.firstName} ${match.senior.user.lastName}` : 'Inconnu';
                    const juniorName = match.junior?.user ? `${match.junior.user.firstName} ${match.junior.user.lastName}` : 'Inconnu';
                    
                    return (
                      <tr key={match.id} className="hover:bg-white/50 transition-colors">
                        <td className="py-4 font-mono text-xs text-gray-500">{match.id.substring(0, 8)}...</td>
                        <td className="py-4 font-bold text-coab-black text-sm">
                          {seniorName} <br/> <span className="text-coab-blue font-medium">& {juniorName}</span>
                        </td>
                        <td className="py-4">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-bold">{match.housingFormula}</span>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${match.status === 'ACTIVE' ? 'bg-coab-green/20 text-coab-green' : 'bg-coab-orange/20 text-coab-orange'}`}>
                            {match.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => setSelectedMatch(match)}
                            className="px-4 py-2 bg-coab-blue text-white hover:bg-coab-blue-dark rounded-lg text-sm font-bold transition-colors"
                          >
                            <FileText size={16} className="inline mr-2" />
                            Gérer les documents
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modale de gestion documentaire */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-extrabold text-coab-black">Documents : {selectedMatch.id.substring(0,8)}...</h2>
                <p className="text-sm text-coab-gray mt-1">Binôme : {selectedMatch.senior?.user?.firstName} & {selectedMatch.junior?.user?.firstName}</p>
              </div>
              <button 
                onClick={() => setSelectedMatch(null)} 
                className="text-gray-400 hover:text-gray-600 transition-colors bg-white p-2 rounded-full border border-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Contrats & Chartes */}
              <section>
                <h3 className="text-lg font-bold text-coab-blue-dark mb-4 border-b pb-2 flex items-center">
                  <FileSignature className="mr-2" size={20} /> Entrée & Contractualisation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-xl p-4 bg-white flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">Contrat Loi ELAN</h4>
                      <p className="text-xs text-gray-500 mt-1">Génère le contrat de cohabitation intergénérationnelle solidaire adapté à la formule choisie.</p>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button 
                        onClick={() => setIsSetupModalOpen(true)}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-bold text-sm transition-colors border border-gray-200"
                      >
                        <Settings size={14} className="inline mr-2" /> Paramétrer
                      </button>
                      <button 
                        onClick={() => handleGenerateContract(selectedMatch.id)}
                        className="flex-1 px-4 py-2 bg-coab-blue/10 text-coab-blue hover:bg-coab-blue hover:text-white rounded-lg font-bold text-sm transition-colors border border-coab-blue/20"
                      >
                        <Download size={14} className="inline mr-2" /> Générer PDF
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-4 bg-white flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">Charte Cohabilis</h4>
                      <p className="text-xs text-gray-500 mt-1">Génère la charte des engagements et du savoir-vivre du réseau national.</p>
                    </div>
                    <button 
                      onClick={() => handleGenerateCharter(selectedMatch.id)}
                      className="mt-4 w-full px-4 py-2 bg-coab-blue/10 text-coab-blue hover:bg-coab-blue hover:text-white rounded-lg font-bold text-sm transition-colors border border-coab-blue/20"
                    >
                      <Download size={14} className="inline mr-2" /> Générer PDF
                    </button>
                  </div>
                </div>
              </section>

              {/* Suivi financier */}
              <section>
                <h3 className="text-lg font-bold text-coab-blue-dark mb-4 border-b pb-2 flex items-center">
                  <CreditCard className="mr-2" size={20} /> Suivi Financier
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-xl p-4 bg-white flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">Quittance de Loyer</h4>
                      <p className="text-xs text-gray-500 mt-1">Génère une quittance attestant du bon paiement pour une période donnée.</p>
                    </div>
                    <button 
                      onClick={() => handleGenerateReceipt(selectedMatch.id)}
                      className="mt-4 w-full px-4 py-2 bg-coab-orange/10 text-coab-orange hover:bg-coab-orange hover:text-white rounded-lg font-bold text-sm transition-colors border border-coab-orange/20"
                    >
                      <Download size={14} className="inline mr-2" /> Éditer Quittance
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-4 bg-white flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">Avis de Paiement</h4>
                      <p className="text-xs text-gray-500 mt-1">Génère un appel de fonds (loyer, indemnité ou adhésion).</p>
                    </div>
                    <button 
                      onClick={() => handleGenerateNotice(selectedMatch.id)}
                      className="mt-4 w-full px-4 py-2 bg-coab-orange/10 text-coab-orange hover:bg-coab-orange hover:text-white rounded-lg font-bold text-sm transition-colors border border-coab-orange/20"
                    >
                      <Download size={14} className="inline mr-2" /> Éditer Avis
                    </button>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      )}

      {selectedMatch && (
        <SetupContractModal
          match={selectedMatch}
          isOpen={isSetupModalOpen}
          onClose={() => setIsSetupModalOpen(false)}
          onSaved={() => {
            setIsSetupModalOpen(false);
            fetchMatches(); // refresh to get new details
          }}
        />
      )}
    </div>
  );
}

export function AdminFinances() {
  const transactions = [
    { id: 'TRX-001', date: '28/08/2026', desc: 'Subvention Région Occitanie', type: 'Revenu', amount: '+ 5 000 €', status: 'Complété' },
    { id: 'TRX-002', date: '25/08/2026', desc: 'Loyer - Dossier #1234', type: 'Revenu', amount: '+ 150 €', status: 'Complété' },
    { id: 'TRX-003', date: '20/08/2026', desc: 'Frais Serveur & Outils', type: 'Dépense', amount: '- 80 €', status: 'Complété' }
  ];

  const handleExport = () => {
    // Mock export CSV
    toast.success("Le fichier 'export_comptable_2026.csv' a été téléchargé.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-coab-black font-sans">Pôle Finances</h1>
        <button onClick={handleExport} className="flex items-center px-4 py-2 bg-coab-black text-white rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors">
          <Download size={16} className="mr-2" /> Export Comptable
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-md shadow-sm border-t-4 border-coab-blue">
          <CardHeader>
            <CardTitle className="text-lg">Balance Trésorerie</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-end">
            <div>
              <p className="text-coab-gray text-sm font-bold uppercase">Solde Actuel</p>
              <p className="text-4xl font-extrabold text-coab-black">14 500 €</p>
            </div>
            <div className="space-x-2">
              <button className="px-3 py-1 bg-coab-green/10 text-coab-green border border-coab-green rounded font-bold text-xs">+ Entrée</button>
              <button className="px-3 py-1 bg-coab-red/10 text-coab-red border border-coab-red rounded font-bold text-xs">- Sortie</button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-md shadow-sm border-t-4 border-coab-orange">
          <CardHeader>
            <CardTitle className="text-lg">Cotisations & Loyers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-coab-gray text-sm font-bold uppercase">Ce mois-ci</p>
            <p className="text-4xl font-extrabold text-coab-orange">1 250 €</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/60 backdrop-blur-md border-white/40 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-coab-blue-dark">Dernières Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-sm font-bold text-coab-gray">Date</th>
                <th className="pb-3 text-sm font-bold text-coab-gray">Description</th>
                <th className="pb-3 text-sm font-bold text-coab-gray">Type</th>
                <th className="pb-3 text-sm font-bold text-coab-gray">Montant</th>
                <th className="pb-3 text-sm font-bold text-coab-gray text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-white/50 transition-colors">
                  <td className="py-4 font-mono text-xs text-gray-500">{t.date}</td>
                  <td className="py-4 font-bold text-coab-black">{t.desc}</td>
                  <td className="py-4 text-sm">{t.type}</td>
                  <td className={`py-4 font-extrabold ${t.amount.includes('+') ? 'text-coab-green' : 'text-coab-red'}`}>{t.amount}</td>
                  <td className="py-4 text-right"><span className="text-xs bg-gray-100 px-2 py-1 rounded font-bold">{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminReports() {
  const dataFormules = [
    { name: 'Solidaire', value: 70 },
    { name: 'Conviviale', value: 20 },
    { name: 'HTH', value: 10 }
  ];
  const COLORS = ['#4A9DB8', '#F5A118', '#5CB794'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-coab-black font-sans">Rapports & Analytics</h1>
      <p className="text-coab-gray">Vue d'ensemble de l'impact social de COAB.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-md shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Répartition des Formules</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex flex-col justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataFormules} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {dataFormules.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex space-x-4 mt-2">
              <span className="text-xs font-bold flex items-center"><span className="w-3 h-3 bg-[#4A9DB8] rounded-full mr-1"></span> Solidaire (70%)</span>
              <span className="text-xs font-bold flex items-center"><span className="w-3 h-3 bg-[#F5A118] rounded-full mr-1"></span> Conviviale (20%)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
