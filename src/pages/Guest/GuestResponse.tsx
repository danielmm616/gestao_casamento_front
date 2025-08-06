import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGuest, GuestStatus, respondGuest } from '../../services/api';
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
      .then((res) => {
        if (res.data?.status === GuestStatus.DECLINED)
          navigate('/guest/rejected');
        if (res.data?.status === GuestStatus.CONFIRMED)
          navigate('/guest/qr', { state: { qrCode: res.data.qrCode } });
        if (res.data?.status === GuestStatus.PRESENT_AT_EVENT)
          navigate('/guest/enjoy');
        setGuest(res.data);
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

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
      <div>
        <p className="guest-response-names">Convidados:</p>
        <ul className="name-list">
          {guest.names.map((name: string, i: number) => (
            <li key={i}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="guest-response-buttons">
        <button onClick={() => handleResponse(true)}>✅ Confirmar</button>
        <button onClick={() => handleResponse(false)}>❌ Recusar</button>
      </div>
    </div>
  );
}
