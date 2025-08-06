import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGuest, GuestStatus, respondGuest } from '../../services/api';
import './GuestResponse.css';
import { CalendarCheck, MapPin, User } from 'lucide-react';

export function GuestResponse() {
  const { id } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [guest, setGuest] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'D&R | Resposta do Convidado';
    console.log('Fetching guest with ID:', id);
    if (!id) return;
    getGuest(id)
      .then((res) => {
        if (res.data?.status === GuestStatus.DECLINED)
          navigate('/guest-info/rejected');
        if (res.data?.status === GuestStatus.CONFIRMED)
          navigate('/guest-info/qr', { state: { qrCode: res.data.qrCode } });
        if (res.data?.status === GuestStatus.PRESENT_AT_EVENT)
          navigate('/guest-info/enjoy');
        setGuest(res.data);
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleResponse = async (confirmed: number) => {
    const response = await respondGuest(id!, confirmed);
    if (confirmed === GuestStatus.CONFIRMED) {
      navigate('/guest-info/qr', { state: { qrCode: response.data.qrCode } });
    } else {
      navigate('/guest-info/rejected');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!guest) return <p>Convidado não encontrado</p>;

  return (
    <div className="guest-response-container">
      <div style={{ width: '100%', textAlign: 'center' }}>
        <img
          className="guest-response-image"
          src={'/src/assets/logo.png'}
          alt={`logo.png`}
          style={{ maxWidth: '90%', maxHeight: '150px', margin: '0 auto' }}
        />
      </div>
      <div>
        <p className="guest-response-names">Convite recepção 30/01/2026</p>
        <ul className="space-y-1">
          {guest.names.map((name: string, i: number) => (
            <li key={i} className="flex items-center gap-2">
              <User size={16} className="text-gray-500" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="guest-response-date">
          <CalendarCheck /> <p>30 de Janeiro de 2026</p>
        </div>
        <div className="guest-response-location">
          <MapPin />{' '}
          <a href="https://maps.app.goo.gl/YRZa43zpsPZp9fqn7" target="_blank">
            Local do evento
          </a>
        </div>
      </div>
      <div className="guest-response-buttons">
        <button
          onClick={() => handleResponse(GuestStatus.CONFIRMED)}
          style={{}}
        >
          Confirmar presença
        </button>
        <button onClick={() => handleResponse(GuestStatus.DECLINED)}>
          Não poderei comparecer
        </button>
      </div>
    </div>
  );
}
