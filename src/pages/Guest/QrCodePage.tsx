import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ImageDown, CalendarCheck, MapPin } from 'lucide-react';
import './QrCodePage.css';
import { useEffect, useState } from 'react';
import { LogoHeader } from '../../Components';
import { GuestNamesList } from '../../Components';

import { useGuest } from '../../contexts';
import { getGuest, GuestStatus } from '../../services/api';

export function QrCodePage() {
  const [loading, setLoading] = useState(true);
  const { guest, setGuest } = useGuest();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const qrCode = guest?.qrCode || location.state?.qrCode;

  useEffect(() => {
    document.title = 'D&R | QR Code do Convidado';
    if (!id) return;
    if (guest) {
      setGuest(guest);
    } else {
      getGuest(id)
        .then((res) => {
          if (res.data?.status === GuestStatus.CONFIRMED) setGuest(res.data);
          if (res.data?.status === GuestStatus.DECLINED)
            navigate('/guest-info/rejected');
          if (res.data?.status === GuestStatus.PRESENT_AT_EVENT)
            navigate('/guest-info/enjoy');
        })
        .finally(() => setLoading(false));
    }
  }, [id, navigate, guest, setGuest]);

  if (loading) return <p>Carregando...</p>;
  if (!qrCode) return <p>QR Code não encontrado</p>;
  if (!guest) return <p>Convidado não encontrado</p>;

  return (
    <div className="qr-code-container">
      <LogoHeader />

      <div className="qr-code-content">
        <h3 style={{ margin: '0' }}>Obrigado pela confirmação! ✨</h3>
        <img src={qrCode} alt="QR Code" />
        <div className="qr-code-download">
          <ImageDown />
          <a
            href={qrCode}
            download="qr-recepcao-daniel-e-rafaella.png"
            className="download-button"
          >
            Baixar QR Code
          </a>
        </div>
        <p>
          Apresente este QR Code na entrada do salão para validar sua presença.
        </p>
      </div>
      <strong>Convidados:</strong>
      <GuestNamesList names={guest?.names} />
      <div className="qr-code-date">
        <CalendarCheck /> <p>30 de Janeiro de 2026</p>
      </div>
      <div className="qr-code-response-location">
        <MapPin />
        <a href="https://maps.app.goo.gl/YRZa43zpsPZp9fqn7" target="_blank">
          Local do evento
        </a>
      </div>
    </div>
  );
}
