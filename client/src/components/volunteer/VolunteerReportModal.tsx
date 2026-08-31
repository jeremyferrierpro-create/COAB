import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

interface VolunteerReportModalProps {
  followup: any; // Données du MonthlyFollowup (incluant le match)
  onClose: () => void;
  onSuccess: (updatedFollowup: any) => void;
}

export default function VolunteerReportModal({ followup, onClose, onSuccess }: VolunteerReportModalProps) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    seniorFeedback: followup.seniorFeedback || '',
    juniorFeedback: followup.juniorFeedback || '',
    generalNotes: followup.generalNotes || '',
    qualityRating: followup.qualityRating ? followup.qualityRating.toString() : '5',
    incidentsReported: followup.incidentsReported || false,
    incidentDetails: followup.incidentDetails || '',
    nextActionSteps: followup.nextActionSteps || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/volunteers/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: followup.id,
          matchId: followup.matchId,
          interviewDate: followup.interviewDate,
          ...formData,
          qualityRating: parseInt(formData.qualityRating, 10)
        })
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l'enregistrement du rapport");
      }

      const data = await res.json();
      toast.success("Rapport enregistré avec succès");
      onSuccess(data);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <h2 className="text-xl font-bold text-coab-black">
            Rapport Mensuel de Suivi
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form id="report-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Infos du binôme */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="font-semibold text-blue-900 mb-2">Binôme concerné :</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <p><strong>Senior :</strong> {followup.match?.senior?.user?.firstName} {followup.match?.senior?.user?.lastName}</p>
                </div>
                <div>
                  <p><strong>Junior :</strong> {followup.match?.junior?.user?.firstName} {followup.match?.junior?.user?.lastName}</p>
                </div>
              </div>
            </div>

            {/* Note de qualité */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Note de qualité globale (1 à 5)
              </label>
              <select
                name="qualityRating"
                value={formData.qualityRating}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coab-blue"
              >
                <option value="5">5 - Excellente</option>
                <option value="4">4 - Très bonne</option>
                <option value="3">3 - Moyenne</option>
                <option value="2">2 - Difficile</option>
                <option value="1">1 - Critique</option>
              </select>
            </div>

            {/* Retours Individuels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Retour du Sénior (Ressenti)
                </label>
                <textarea
                  name="seniorFeedback"
                  value={formData.seniorFeedback}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coab-blue"
                  placeholder="Qu'est-ce que le sénior a dit ?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Retour du Junior (Ressenti)
                </label>
                <textarea
                  name="juniorFeedback"
                  value={formData.juniorFeedback}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coab-blue"
                  placeholder="Qu'est-ce que le junior a dit ?"
                />
              </div>
            </div>

            {/* Notes Générales */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Notes générales (Analyse du bénévole)
              </label>
              <textarea
                name="generalNotes"
                value={formData.generalNotes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coab-blue"
                placeholder="Votre analyse de la situation..."
              />
            </div>

            {/* Incidents */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="incidentsReported"
                  checked={formData.incidentsReported}
                  onChange={handleChange}
                  className="w-5 h-5 text-coab-blue rounded border-gray-300 focus:ring-coab-blue"
                />
                <span className="font-semibold text-gray-700">Un incident a-t-il été signalé ce mois-ci ?</span>
              </label>

              {formData.incidentsReported && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Détails de l'incident
                  </label>
                  <textarea
                    name="incidentDetails"
                    value={formData.incidentDetails}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-coab-blue"
                    placeholder="Décrivez l'incident..."
                    required={formData.incidentsReported}
                  />
                </div>
              )}
            </div>

            {/* Prochaines Étapes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Prochaines étapes / Actions requises
              </label>
              <textarea
                name="nextActionSteps"
                value={formData.nextActionSteps}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coab-blue"
                placeholder="Ex: Contacter l'assistante sociale, refaire un point la semaine prochaine..."
              />
            </div>

          </form>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-200 rounded-xl transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            form="report-form"
            disabled={loading}
            className="px-6 py-2.5 font-medium text-white bg-coab-blue hover:bg-coab-blue-dark rounded-xl transition-colors disabled:opacity-50"
          >
            {loading ? 'Enregistrement...' : 'Enregistrer le rapport'}
          </button>
        </div>

      </div>
    </div>
  );
}
