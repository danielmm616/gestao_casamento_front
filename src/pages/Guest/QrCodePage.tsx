import { useLocation } from 'react-router-dom';
import { ImageDown, CalendarCheck, MapPin } from 'lucide-react';
import './QrCodePage.css';
import { useEffect } from 'react';
import logo from '../../assets/logo.png';

export function QrCodePage() {
  const location = useLocation();
  const qrCode = location.state?.qrCode;

  useEffect(() => {
    document.title = 'D&R | QR Code do Convidado';
  }, []);

  if (!qrCode) return <p>QR Code não encontrado</p>;

  return (
    <div className="qr-code-container">
      <div style={{ width: '100%', textAlign: 'center' }}>
        <img
          className="guest-response-image"
          src={logo}
          alt={`logo.png`}
          style={{ maxWidth: '90%', maxHeight: '150px', margin: '0 auto' }}
        />
      </div>
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
