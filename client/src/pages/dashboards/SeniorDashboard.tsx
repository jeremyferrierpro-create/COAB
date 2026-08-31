import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../contexts/AuthContext';
import EditProfileModal from '../../components/profile/EditProfileModal';
import { SignaturePad } from '../../components/profile/SignaturePad';

export default function SeniorDashboard() {
  const { user, token } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setProfileData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProfile();
  }, [token]);

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  const matches = profileData?.seniorProfile?.matches || [];

  return (
    <div className="min-h-screen bg-coab-gray-light/20 p-8">
      <Helmet>
        <title>Tableau de bord Sénior | COAB</title>
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-coab-black">Espace Sénior</h1>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Profil */}
          <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-coab-blue-dark mb-4">Mon Profil</h2>
              <p className="text-coab-gray-dark font-medium">{profileData?.firstName} {profileData?.lastName}</p>
              <p className="text-sm text-coab-gray mb-4">{profileData?.email}</p>
              
              <div className="space-y-2 mt-4 text-sm">
                <p><strong>Téléphone :</strong> {profileData?.phone || 'Non renseigné'}</p>
                <p><strong>Adresse :</strong> {profileData?.address || 'Non renseignée'}</p>
              </div>
            </div>
            
            <div className="space-y-3 mt-6">
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="w-full py-2 bg-coab-blue/10 text-coab-blue-dark rounded-xl font-medium hover:bg-coab-blue/20 transition-colors">
                Modifier mon profil
              </button>

              <button 
                onClick={() => setIsSignatureModalOpen(true)}
                className="w-full py-2 bg-coab-orange/10 text-coab-orange rounded-xl font-medium hover:bg-coab-orange/20 transition-colors flex items-center justify-center">
                <span className="mr-2">✍️</span> 
                {profileData?.signatureBase64 ? 'Modifier ma signature' : 'Créer ma signature'}
              </button>
            </div>
          </div>

          {/* Card 2: Binôme / Match */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-coab-blue-dark mb-4">Mon Binôme</h2>
            
            {matches.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-coab-gray bg-coab-gray-light/30 rounded-xl border border-dashed border-gray-300">
                <p>Aucun binôme actif pour le moment.</p>
                <p className="text-sm">L'équipe COAB recherche activement le candidat idéal.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {matches.map((match: any) => (
                  <div key={match.id} className="p-4 border border-coab-blue/20 rounded-xl bg-coab-blue/5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-coab-black">{match.junior?.user?.firstName} {match.junior?.user?.lastName}</h3>
                        <span className="inline-block px-2 py-1 mt-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                          {match.status}
                        </span>
                      </div>
                      <div className="text-right text-sm">
                        <p><strong>Formule :</strong> {match.housingFormula}</p>
                        <p><strong>Début :</strong> {match.startDate ? new Date(match.startDate).toLocaleDateString('fr-FR') : 'Non défini'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Card 3: Documents */}
          <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-coab-blue-dark">Mes Documents</h2>
              <button className="px-4 py-2 bg-coab-orange text-white rounded-xl text-sm font-bold hover:bg-coab-orange-dark transition-colors">
                + Ajouter
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Fake Document Items for visual layout */}
              <div className="p-4 border rounded-xl flex items-center justify-between">
                <span className="text-sm font-medium">Carte d'identité</span>
                <span className="text-green-500 font-bold">✓</span>
              </div>
              <div className="p-4 border rounded-xl flex items-center justify-between">
                <span className="text-sm font-medium">Justificatif de Domicile</span>
                <span className="text-coab-gray-light">En attente</span>
              </div>
            </div>
          </div>
          
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex justify-end">
          <button 
            onClick={async () => {
              if (!window.confirm("Êtes-vous sûr de vouloir supprimer définitivement votre compte ? (Droit à l'oubli)")) return;
              try {
                const res = await fetch(`http://localhost:3000/api/users/${user?.id}`, {
                  method: 'DELETE',
                  headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) window.location.href = '/';
              } catch (e) {
                console.error(e);
              }
            }}
            className="px-4 py-2 text-sm text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium">
            Supprimer mon compte (RGPD)
          </button>
        </div>
      </div>
      
      {isEditModalOpen && (
        <EditProfileModal 
          profileData={profileData} 
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={(updatedData) => setProfileData({ ...profileData, ...updatedData })}
        />
      )}

      {isSignatureModalOpen && (
        <SignaturePad
          onCancel={() => setIsSignatureModalOpen(false)}
          onSignatureSaved={(base64) => {
            setProfileData({ ...profileData, signatureBase64: base64 });
            setIsSignatureModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
