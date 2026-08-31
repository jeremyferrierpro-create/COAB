import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

export function EditUserAdminModal({ isOpen, onClose, userId, onSuccess }: { isOpen: boolean; onClose: () => void; userId: string; onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [role, setRole] = useState('SENIOR');
  const [formData, setFormData] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'PREFER_NOT_TO_SAY',
    isVerified: false,
    birthDate: '',
    address: '',
    city: '',
    zipCode: '',
    housingType: '',
    roomSurface: 0,
    hasPets: false,
    accessibilityLevel: '',
    situation: '',
    maxBudget: 0,
    moveInDate: '',
    discoverySource: '',
    mutualInsurance: '',
    motivations: '',
    freeComments: ''
  });

  useEffect(() => {
    if (isOpen && userId) {
      const fetchUser = async () => {
        setFetching(true);
        try {
          const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('coab_token')}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            setRole(data.role);
            setFormData({
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              email: data.email || '',
              phone: data.phone || '',
              gender: data.gender || 'PREFER_NOT_TO_SAY',
              isVerified: data.isVerified || false,
              birthDate: data.birthDate ? data.birthDate.split('T')[0] : '',
              address: data.address || '',
              city: data.city || '',
              zipCode: data.zipCode || '',
              // Champs Sénior/Junior
              housingType: data.seniorProfile?.housingType || '',
              roomSurface: data.seniorProfile?.roomSurface || 0,
              hasPets: data.seniorProfile?.hasPets || data.juniorProfile?.hasPets || false,
              accessibilityLevel: data.seniorProfile?.accessibilityLevel || '',
              situation: data.juniorProfile?.situation || '',
              maxBudget: data.juniorProfile?.maxBudget || 0,
              moveInDate: data.juniorProfile?.moveInDate ? data.juniorProfile.moveInDate.split('T')[0] : '',
              discoverySource: data.seniorProfile?.discoverySource || data.juniorProfile?.discoverySource || '',
              mutualInsurance: data.seniorProfile?.mutualInsurance || data.juniorProfile?.mutualInsurance || '',
              motivations: data.seniorProfile?.motivations || data.juniorProfile?.motivations || '',
              freeComments: data.seniorProfile?.freeComments || data.juniorProfile?.freeComments || ''
            });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('coab_token')}`
        },
        body: JSON.stringify({ ...formData, role })
      });
      if (res.ok) {
        if (onSuccess) onSuccess();
        onClose();
        toast.success('Utilisateur mis à jour avec succès');
      } else {
        const err = await res.json();
        toast.error('Erreur: ' + (err.error || 'Impossible de mettre à jour l\'utilisateur'));
      }
    } catch (error) {
      console.error(error);
      toast.error('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white/90 backdrop-blur border-b px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-extrabold text-coab-black">Éditer le Profil</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <X size={24} />
          </button>
        </div>

        {fetching ? (
          <div className="p-10 text-center font-bold text-gray-500">Chargement des données...</div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isVerified" 
                  checked={formData.isVerified} 
                  onChange={handleChange} 
                  className="w-5 h-5 text-coab-green rounded focus:ring-coab-green" 
                />
                <span className="font-bold text-coab-black">Marquer ce profil comme "Vérifié"</span>
              </label>
              <p className="text-sm text-gray-500 mt-1 ml-8">Veuillez cocher cette case uniquement si vous avez validé la pièce d'identité ou eu la personne au téléphone.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informations Civiles */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-coab-blue border-b pb-2">Informations Civiles</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Prénom</label>
                    <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nom</label>
                    <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Téléphone</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Genre</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 bg-white">
                    <option value="PREFER_NOT_TO_SAY">Non précisé</option>
                    <option value="FEMALE">Femme</option>
                    <option value="MALE">Homme</option>
                    <option value="NON_BINARY">Non-binaire</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date de naissance</label>
                  <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Adresse</label>
                  <input name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Code postal</label>
                    <input name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Ville</label>
                    <input name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                  </div>
                </div>
              </div>

              {/* Informations Spécifiques */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-coab-orange border-b pb-2">
                  Détails du Profil ({role})
                </h3>
                
                {(role === 'SENIOR' || role === 'JUNIOR') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Comment avez-vous connu la cohabitation ?</label>
                      <select name="discoverySource" value={formData.discoverySource} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 bg-white">
                        <option value="">Sélectionnez...</option>
                        <option value="Internet">Internet / Réseaux sociaux</option>
                        <option value="Bouche a oreille">Bouche à oreille</option>
                        <option value="Presse">Presse / TV / Radio</option>
                        <option value="Mutuelle">Mutuelle / Caisse de retraite</option>
                        <option value="Partenaire">Partenaire social</option>
                      </select>
                    </div>

                    {formData.discoverySource === 'Mutuelle' && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Quelle mutuelle / groupe ?</label>
                        <input name="mutualInsurance" value={formData.mutualInsurance} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-1">Motivations pour la cohabitation</label>
                      <textarea name="motivations" value={formData.motivations} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 h-20" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Commentaires libres (Animaux, allergies...)</label>
                      <textarea name="freeComments" value={formData.freeComments} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 h-16" />
                    </div>
                  </>
                )}

                {role === 'SENIOR' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Type de logement</label>
                      <input name="housingType" value={formData.housingType} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                      <input type="checkbox" id="hasPets" name="hasPets" checked={formData.hasPets} onChange={handleChange} className="w-4 h-4 text-coab-blue" />
                      <label htmlFor="hasPets" className="text-sm font-medium">Présence d'animaux</label>
                    </div>
                  </>
                )}

                {role === 'JUNIOR' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Situation actuelle</label>
                      <select name="situation" value={formData.situation} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 bg-white">
                        <option value="">Sélectionnez...</option>
                        <option value="Etudiant">Étudiant(e)</option>
                        <option value="Alternant">Apprenti(e) / Alternant(e)</option>
                        <option value="Jeune Actif">Jeune actif</option>
                        <option value="Service Civique">Service Civique</option>
                        <option value="Recherche d'emploi">En recherche d'emploi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Budget mensuel max (€)</label>
                      <input type="number" name="maxBudget" value={formData.maxBudget} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date d'emménagement souhaitée</label>
                      <input type="date" name="moveInDate" value={formData.moveInDate} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t gap-4">
              <button type="button" onClick={onClose} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                Annuler
              </button>
              <Button type="submit" isLoading={loading} className="px-8 py-3 bg-coab-blue text-white rounded-lg font-bold text-lg hover:bg-coab-blue-dark shadow-md">
                Enregistrer
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
