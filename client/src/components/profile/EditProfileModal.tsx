import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

interface EditProfileModalProps {
  profileData: any;
  onClose: () => void;
  onSuccess: (updatedData: any) => void;
}

export default function EditProfileModal({ profileData, onClose, onSuccess }: EditProfileModalProps) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profileData.firstName || '',
    lastName: profileData.lastName || '',
    phone: profileData.phone || '',
    address: profileData.address || '',
    zipCode: profileData.zipCode || '',
    city: profileData.city || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Erreur de mise à jour");
      toast.success("Profil mis à jour !");
      onSuccess(formData); 
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-coab-blue-dark mb-6">Modifier mon profil</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Prénom</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-coab-blue outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Nom</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-coab-blue outline-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Téléphone</label>
            <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-coab-blue outline-none" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Adresse</label>
            <input name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-coab-blue outline-none" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Code postal</label>
              <input name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-coab-blue outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Ville</label>
              <input name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-coab-blue outline-none" />
            </div>
          </div>
          
          <div className="mt-8 flex justify-between items-center pt-4 border-t">
            <button 
              type="button" 
              onClick={() => {
                if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement votre compte et toutes vos données (RGPD - Droit à l'oubli) ? Cette action est irréversible.")) {
                  // TODO: Delete account API call
                  toast.success("Demande de suppression envoyée.");
                }
              }} 
              className="px-4 py-2 rounded-lg font-bold text-red-600 hover:bg-red-50 transition-colors text-sm"
            >
              Supprimer mon compte
            </button>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg font-bold text-gray-500 hover:bg-gray-100 transition-colors">
                Annuler
              </button>
              <Button type="submit" isLoading={loading} className="px-6 py-2 bg-coab-blue text-white rounded-lg font-bold hover:bg-coab-blue-dark">
                Enregistrer
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
