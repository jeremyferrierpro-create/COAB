import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

export function AddUserAdminModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('SENIOR');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'PREFER_NOT_TO_SAY',
    birthDate: '',
    address: '',
    city: '',
    zipCode: '',
    // Sénior fields
    housingType: '',
    roomSurface: 0,
    hasPets: false,
    accessibilityLevel: '',
    // Junior fields
    situation: '',
    maxBudget: 0,
    moveInDate: '',
    // Cohabilis extra
    discoverySource: '',
    mutualInsurance: '',
    motivations: '',
    freeComments: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/users/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('coab_token')}`
        },
        body: JSON.stringify({ ...formData, role })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.tempPassword) {
          toast.success(`Utilisateur créé !\nEmail : ${data.user.email}\nMot de passe : ${data.tempPassword}`, { duration: 8000 });
        } else {
          toast.success('Utilisateur créé avec succès !');
        }
        if (onSuccess) onSuccess();
        onClose();
      } else {
        const err = await res.json();
        toast.error('Erreur: ' + (err.error || 'Impossible de créer l\'utilisateur'));
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
          <h2 className="text-2xl font-extrabold text-coab-black">Créer un Profil (Admin)</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Sélection du Rôle */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <label className="block text-sm font-bold text-coab-black mb-2 uppercase tracking-wide">Type de profil</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-3 bg-white font-bold"
            >
              <option value="SENIOR">Sénior (Hébergeur)</option>
              <option value="JUNIOR">Junior (Hébergé)</option>
              <option value="VOLUNTEER">Bénévole</option>
              <option value="ADMIN">Administrateur</option>
            </select>
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
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Pour accès web" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Téléphone</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
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
                <input required name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Code postal</label>
                  <input required name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ville</label>
                  <input required name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" />
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
                    <textarea name="motivations" value={formData.motivations} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 h-20" placeholder="Minimum 500 caractères attendus par Cohabilis..." />
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
                    <input name="housingType" value={formData.housingType} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Appartement, Maison..." />
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
              Créer le Profil
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
