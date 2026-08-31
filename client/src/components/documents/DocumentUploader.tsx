import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { UploadCloud, FileText, CheckCircle, X } from 'lucide-react';

interface DocumentUploaderProps {
  docType: 'ID_PROOF' | 'STATUS_PROOF' | 'CONTRACT' | 'RENT_RECEIPT';
  label: string;
  onUploadSuccess?: (doc: any) => void;
  existingDocument?: any;
}

export default function DocumentUploader({ docType, label, onUploadSuccess, existingDocument }: DocumentUploaderProps) {
  const { token } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState<any>(existingDocument || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Le fichier est trop volumineux (Maximum 10 Mo)');
      return;
    }

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      toast.error('Format non supporté (PDF, JPEG, PNG uniquement)');
      return;
    }

    try {
      setLoading(true);
      
      // Convertir en base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64Data = reader.result;
        
        // Envoyer à l'API
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/documents/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            docType,
            fileData: base64Data
          })
        });

        if (!res.ok) {
          throw new Error("Erreur lors de l'upload");
        }

        const data = await res.json();
        setDocument(data);
        toast.success('Document ajouté avec succès !');
        if (onUploadSuccess) onUploadSuccess(data);
      };
      
      reader.onerror = () => {
        throw new Error("Erreur de lecture du fichier");
      };

    } catch (error) {
      console.error(error);
      toast.error("Impossible d'uploader le document");
    } finally {
      setLoading(false);
    }
  };

  if (document) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 text-green-600 rounded-lg">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="font-bold text-green-900">{label}</p>
            <p className="text-sm text-green-700">Document transmis (Envoyé le {new Date(document.signedAt || Date.now()).toLocaleDateString()})</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <a 
            href={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${document.fileUrl}`} 
            target="_blank" 
            rel="noreferrer"
            className="px-3 py-1.5 bg-white border border-green-300 text-green-700 rounded-lg text-sm font-bold hover:bg-green-100 transition-colors"
          >
            Voir
          </a>
          <button 
            onClick={() => setDocument(null)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Supprimer / Remplacer"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="font-semibold text-coab-black">{label}</label>
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
          ${isDragging ? 'border-coab-blue bg-blue-50' : 'border-gray-300 hover:border-coab-blue/50 hover:bg-gray-50'}
          ${loading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".pdf,.jpg,.jpeg,.png" 
          onChange={handleFileChange}
        />
        
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className={`p-4 rounded-full ${isDragging ? 'bg-coab-blue/20 text-coab-blue' : 'bg-gray-100 text-gray-500'}`}>
            {loading ? <div className="animate-spin h-8 w-8 border-4 border-coab-blue border-t-transparent rounded-full" /> : <UploadCloud size={32} />}
          </div>
          
          <div>
            <p className="font-bold text-gray-700">
              {loading ? 'Upload en cours...' : 'Cliquez ou glissez-déposez votre document ici'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              PDF, JPG, PNG (Max 10 Mo)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
