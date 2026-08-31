import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface SetupContractModalProps {
  match: any;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export function SetupContractModal({ match, isOpen, onClose, onSaved }: SetupContractModalProps) {
  const [rentAmount, setRentAmount] = useState(match.rentAmount || '');
  const [chargesAmount, setChargesAmount] = useState(match.chargesAmount || '');
  const [contractType, setContractType] = useState(match.contractType || 'Loi ELAN (Solidaire)');
  const [paidServices, setPaidServices] = useState<string[]>(match.paidServices || []);
  const [startDate, setStartDate] = useState(match.startDate ? new Date(match.startDate).toISOString().split('T')[0] : '');
  const [endDate, setEndDate] = useState(match.endDate ? new Date(match.endDate).toISOString().split('T')[0] : '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableServices = [
    'Internet / Wi-Fi',
    'Machine à laver',
    'Ménage additionnel',
    'Repas fournis',
    'Parking'
  ];

  const handleToggleService = (service: string) => {
    setPaidServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('coab_token');
      const response = await fetch(`http://localhost:3000/api/legal/setup-contract/${match.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rentAmount,
          chargesAmount,
          contractType,
          paidServices,
          startDate,
          endDate
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde du contrat');
      }

      toast.success('Détails du contrat sauvegardés avec succès !');
      onSaved();
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Erreur de connexion avec le serveur');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">
            Configurer l'accord contractuel
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm mb-6">
            Vous configurez le dossier pour le binôme :<br />
            <strong>Sénior :</strong> {match.senior?.user?.firstName} {match.senior?.user?.lastName}<br />
            <strong>Junior :</strong> {match.junior?.user?.firstName} {match.junior?.user?.lastName}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de Contrat
              </label>
              <select
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-coab-blue focus:border-transparent"
                required
              >
                <option value="Loi ELAN (Solidaire)">Modèle 5 - Loi ELAN (Solidaire)</option>
                <option value="Bail Meublé (Loi 89)">Modèle 2 - Bail Meublé (Loi 89)</option>
                <option value="Bail Nu (Loi 89)">Modèle 1 - Bail Nu (Loi 89)</option>
                <option value="Bail Mobilité">Modèle 3 - Bail Mobilité</option>
                <option value="Saisonnier">Modèle 4 - Location Saisonnière</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loyer / Indemnité de base (€/mois)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-coab-blue focus:border-transparent"
                placeholder="Ex: 150"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Charges forfaitaires (€/mois)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={chargesAmount}
                onChange={(e) => setChargesAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-coab-blue focus:border-transparent"
                placeholder="Ex: 50"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Services payants optionnels (Inclus dans les charges)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {availableServices.map((service) => (
                <label key={service} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paidServices.includes(service)}
                    onChange={() => handleToggleService(service)}
                    className="rounded text-coab-blue focus:ring-coab-blue border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-coab-blue text-white rounded-lg hover:bg-coab-blue-dark transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sauvegarde...' : 'Valider l\'accord'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
