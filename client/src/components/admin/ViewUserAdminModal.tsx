import { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';

export function ViewUserAdminModal({ isOpen, onClose, userId }: { isOpen: boolean; onClose: () => void; userId: string }) {
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (isOpen && userId) {
      const fetchUser = async () => {
        setFetching(true);
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('coab_token')}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setFetching(false);
        }
      };
      fetchUser();
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl relative">
        <div className="sticky top-0 bg-white/90 backdrop-blur border-b px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-extrabold text-coab-black">Profil Utilisateur</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <X size={24} />
          </button>
        </div>

        {fetching ? (
          <div className="p-10 text-center font-bold text-gray-500">Chargement des données...</div>
        ) : user ? (
          <div className="p-6 space-y-8">
            {/* Header info */}
            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl border">
              <div className="w-16 h-16 bg-coab-blue text-white flex items-center justify-center rounded-full text-2xl font-bold">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-coab-black">{user.firstName} {user.lastName}</h3>
                <p className="text-gray-500 flex items-center gap-2">
                  {user.role} 
                  {user.isVerified ? (
                    <span className="text-coab-green flex items-center text-xs font-bold"><CheckCircle size={14} className="mr-1"/> Vérifié</span>
                  ) : (
                    <span className="text-coab-red flex items-center text-xs font-bold"><XCircle size={14} className="mr-1"/> Non vérifié</span>
                  )}
                </p>
              </div>
            </div>

            {/* Infos de base */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-coab-blue border-b pb-2">Informations Personnelles</h4>
                <div className="text-sm">
                  <p><span className="text-gray-500">Email :</span> {user.email}</p>
                  <p><span className="text-gray-500">Téléphone :</span> {user.phone || 'Non renseigné'}</p>
                  <p><span className="text-gray-500">Genre :</span> {user.gender || 'Non renseigné'}</p>
                  <p><span className="text-gray-500">Date de naissance :</span> {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'Non renseignée'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-coab-blue border-b pb-2">Coordonnées</h4>
                <div className="text-sm">
                  <p><span className="text-gray-500">Adresse :</span> {user.address || 'Non renseignée'}</p>
                  <p><span className="text-gray-500">Code Postal :</span> {user.zipCode || 'Non renseigné'}</p>
                  <p><span className="text-gray-500">Ville :</span> {user.city || 'Non renseignée'}</p>
                </div>
              </div>
            </div>

            {/* Profil Spécifique */}
            {user.role === 'SENIOR' && user.seniorProfile && (
              <div className="space-y-4">
                <h4 className="font-bold text-coab-orange border-b pb-2">Profil Hébergeur (Sénior)</h4>
                <div className="grid grid-cols-2 gap-4 text-sm bg-orange-50 p-4 rounded-xl">
                  <div>
                    <p><span className="font-semibold text-gray-700">Type de logement :</span> {user.seniorProfile.housingType}</p>
                    <p><span className="font-semibold text-gray-700">Surface dispo :</span> {user.seniorProfile.roomSurface} m²</p>
                    <p><span className="font-semibold text-gray-700">Animaux :</span> {user.seniorProfile.hasPets ? 'Oui' : 'Non'}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold text-gray-700">Source :</span> {user.seniorProfile.discoverySource || 'N/A'}</p>
                    <p><span className="font-semibold text-gray-700">Mutuelle :</span> {user.seniorProfile.mutualInsurance || 'N/A'}</p>
                  </div>
                  <div className="col-span-2 mt-2">
                    <p className="font-semibold text-gray-700">Motivations :</p>
                    <p className="text-gray-600 bg-white p-3 rounded-lg border mt-1">{user.seniorProfile.motivations || 'Aucune motivation renseignée.'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold text-gray-700">Commentaires :</p>
                    <p className="text-gray-600 bg-white p-3 rounded-lg border mt-1">{user.seniorProfile.freeComments || 'Aucun commentaire.'}</p>
                  </div>
                </div>
              </div>
            )}

            {user.role === 'JUNIOR' && user.juniorProfile && (
              <div className="space-y-4">
                <h4 className="font-bold text-coab-orange border-b pb-2">Profil Hébergé (Junior)</h4>
                <div className="grid grid-cols-2 gap-4 text-sm bg-orange-50 p-4 rounded-xl">
                  <div>
                    <p><span className="font-semibold text-gray-700">Situation :</span> {user.juniorProfile.situation}</p>
                    <p><span className="font-semibold text-gray-700">Budget max :</span> {user.juniorProfile.maxBudget} €</p>
                    <p><span className="font-semibold text-gray-700">Emménagement :</span> {user.juniorProfile.moveInDate ? new Date(user.juniorProfile.moveInDate).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div>
                    <p><span className="font-semibold text-gray-700">Source :</span> {user.juniorProfile.discoverySource || 'N/A'}</p>
                    <p><span className="font-semibold text-gray-700">Mutuelle :</span> {user.juniorProfile.mutualInsurance || 'N/A'}</p>
                  </div>
                  <div className="col-span-2 mt-2">
                    <p className="font-semibold text-gray-700">Motivations :</p>
                    <p className="text-gray-600 bg-white p-3 rounded-lg border mt-1">{user.juniorProfile.motivations || 'Aucune motivation renseignée.'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold text-gray-700">Commentaires :</p>
                    <p className="text-gray-600 bg-white p-3 rounded-lg border mt-1">{user.juniorProfile.freeComments || 'Aucun commentaire.'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Documents & Validation */}
            <div className="space-y-4">
              <h4 className="font-bold text-coab-blue border-b pb-2">Documents & Validation</h4>
              
              <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                {user.documents && user.documents.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {user.documents.map((doc: any) => (
                      <div key={doc.id} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg">
                        <span className="text-sm font-semibold text-gray-700">{doc.docType}</span>
                        <a 
                          href={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${doc.fileUrl}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-xs px-2 py-1 bg-coab-blue/10 text-coab-blue rounded hover:bg-coab-blue/20"
                        >
                          Voir
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Aucun document transmis.</p>
                )}

                <div className="pt-4 border-t border-gray-200 flex justify-end">
                  <button 
                    onClick={async () => {
                      if (!window.confirm("Valider ce dossier comme 'Complet' ?")) return;
                      try {
                        const token = localStorage.getItem('coab_token');
                        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/users/${user.id}/validate`, {
                          method: 'POST',
                          headers: { Authorization: `Bearer ${token}` }
                        });
                        if (res.ok) {
                          alert("Le dossier a été validé avec succès.");
                          // Update local state to reflect changes if needed
                        }
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                    className="px-4 py-2 bg-coab-green text-white text-sm font-bold rounded-xl hover:bg-coab-green-dark transition-colors"
                  >
                    Valider le dossier (Complet)
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="p-10 text-center text-gray-500">Erreur de chargement.</div>
        )}
      </div>
    </div>
  );
}
