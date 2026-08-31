import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../contexts/AuthContext';
import EditProfileModal from '../../components/profile/EditProfileModal';

export default function VolunteerDashboard() {
  const { user, token } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/users/me`, {
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

  const followups = profileData?.volunteerMatches || [];

  return (
    <div className="min-h-screen bg-coab-gray-light/20 p-8">
      <Helmet>
        <title>Tableau de bord Bénévole | COAB</title>
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-coab-black">Espace Bénévole</h1>
        
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
                <p><strong>Bénévole Actif</strong></p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="mt-6 w-full py-2 bg-coab-blue/10 text-coab-blue-dark rounded-xl font-medium hover:bg-coab-blue/20 transition-colors">
              Modifier mon profil
            </button>
          </div>

          {/* Card 2: Binômes Suivis */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-coab-blue-dark mb-4">Binômes suivis (Mensuel)</h2>
            
            {followups.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-coab-gray bg-coab-gray-light/30 rounded-xl border border-dashed border-gray-300">
                <p>Aucun suivi assigné pour le moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {followups.map((followup: any) => (
                  <div key={followup.id} className="p-4 border border-coab-blue/20 rounded-xl bg-coab-blue/5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-coab-black">
                          Sénior : {followup.match?.senior?.user?.firstName} {followup.match?.senior?.user?.lastName}
                        </h3>
                        <h3 className="font-bold text-coab-black">
                          Junior : {followup.match?.junior?.user?.firstName} {followup.match?.junior?.user?.lastName}
                        </h3>
                        <span className="inline-block px-2 py-1 mt-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                          Date du RDV : {new Date(followup.interviewDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <button className="px-3 py-1 bg-white border border-coab-blue/30 rounded-lg text-sm font-medium hover:bg-coab-blue/10">
                        Rédiger le rapport
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex justify-end">
          <button 
            onClick={async () => {
              if (!window.confirm("Êtes-vous sûr de vouloir supprimer définitivement votre compte ? (Droit à l'oubli)")) return;
              try {
                const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/users/${user?.id}`, {
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
    </div>
  );
}
