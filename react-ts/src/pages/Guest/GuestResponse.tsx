import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGuest, respondGuest } from '../../services/api';
import './GuestResponse.css';

export function GuestResponse() {
  const { id } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [guest, setGuest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching guest with ID:', id);
    if (!id) return;
    getGuest(id)
      .then((res) => setGuest(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleResponse = async (confirmed: boolean) => {
    const response = await respondGuest(id!, confirmed);
    if (confirmed) {
      navigate('/qr', { state: { qrCode: response.data.qrCode } });
    } else {
      navigate('/rejected');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!guest) return <p>Convidado não encontrado</p>;

  return (
    <div className="guest-response-container">
      <h1 className="guest-response-title">{guest.title}</h1>
      <p className="guest-response-names">
        Convidados: {guest.names.join(', ')}
      </p>
      <div className="guest-response-buttons">
        <button onClick={() => handleResponse(true)}>✅ Confirmar</button>
        <button onClick={() => handleResponse(false)}>❌ Recusar</button>
      </div>
    </div>
  );
}
