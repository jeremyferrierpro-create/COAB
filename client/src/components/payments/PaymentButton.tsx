import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { CreditCard } from 'lucide-react';

interface PaymentButtonProps {
  amount: number;
  description: string;
  type: 'MEMBERSHIP_COHABILIS' | 'COAB_DUES' | 'RENT_PAYMENT';
  matchId?: string;
  label?: string;
  className?: string;
}

export default function PaymentButton({ amount, description, type, matchId, label = 'Payer maintenant', className = '' }: PaymentButtonProps) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount, description, type, matchId })
      });

      if (!res.ok) throw new Error('Erreur lors de l\'initialisation du paiement');

      const data = await res.json();
      
      // En mode Mock, on redirige vers l'URL retournée qui simulera le webhook
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      toast.error('Impossible d\'initier le paiement.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`flex items-center justify-center space-x-2 bg-coab-blue hover:bg-coab-blue-dark text-white font-bold py-2 px-4 rounded-xl transition-colors disabled:opacity-50 ${className}`}
    >
      <CreditCard size={18} />
      <span>{loading ? 'Redirection...' : `${label} (${amount} €)`}</span>
    </button>
  );
}
