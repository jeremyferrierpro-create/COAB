import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import toast from 'react-hot-toast';

interface SignaturePadProps {
  onSignatureSaved: (base64: string) => void;
  onCancel: () => void;
}

export function SignaturePad({ onSignatureSaved, onCancel }: SignaturePadProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isSaving, setIsSaving] = useState(false);

  const clear = () => {
    sigCanvas.current?.clear();
  };

  const save = async () => {
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      toast.error('Veuillez signer avant de valider.');
      return;
    }

    setIsSaving(true);
    // Remove the background (transparent) and get base64 PNG
    const base64Signature = sigCanvas.current.getCanvas().toDataURL('image/png');
    
    try {
      const token = localStorage.getItem('coab_token');
      // On sauvegarde la signature dans le profil de l'utilisateur connecté
      const response = await fetch('http://localhost:3000/api/users/signature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ signature: base64Signature })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      toast.success('Signature enregistrée avec succès !');
      onSignatureSaved(base64Signature);
    } catch (err) {
      toast.error('Erreur lors de l\'enregistrement de la signature.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Votre Signature</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            Veuillez dessiner votre signature dans le cadre ci-dessous (avec la souris ou votre doigt).
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <SignatureCanvas 
              ref={sigCanvas as any} 
              penColor="black"
              canvasProps={{className: 'w-full h-48 cursor-crosshair'}} 
            />
          </div>
          
          <div className="mt-2 text-right">
            <button 
              onClick={clear}
              className="text-xs text-gray-500 hover:text-gray-800 underline"
            >
              Effacer le tracé
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-bold transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={save}
            disabled={isSaving}
            className="px-4 py-2 bg-coab-blue text-white hover:bg-coab-blue-dark rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Enregistrement...' : 'Enregistrer ma signature'}
          </button>
        </div>
      </div>
    </div>
  );
}
