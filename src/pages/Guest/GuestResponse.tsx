import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getGuest,
  GuestStatus,
  respondGuest,
  type IGuest,
} from '../../services/api';
import './GuestResponse.css';
import { CalendarCheck, MapPin } from 'lucide-react';
import { GuestNamesList, LogoHeader } from '../../Components';

export function GuestResponse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guest, setGuest] = useState<IGuest | null>(null);
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
          navigate(`/guest-info/${id}/qr`, {
            state: { qrCode: res.data.qrCode },
          });
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
      <LogoHeader />

      <div>
        <p className="guest-response-names">Convite recepção</p>
        <GuestNamesList names={guest.names} />
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
