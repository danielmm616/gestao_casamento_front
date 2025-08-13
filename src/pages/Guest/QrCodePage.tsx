import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FileDown, CalendarCheck, MapPin } from 'lucide-react';
import './QrCodePage.css';
import { useEffect, useRef, useState } from 'react';
import { LogoHeader } from '../../Components';
import { GuestNamesList } from '../../Components';
import { useGuest } from '../../contexts';
import { getGuest, GuestStatus } from '../../services/api';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function QrCodePage() {
  const [loading, setLoading] = useState(true);
  const { guest, setGuest } = useGuest();
  const [showButton, setShowButton] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const qrCode = guest?.qrCode || location.state?.qrCode;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'D&R | QR Code do Convidado';
    if (!id) return;
    if (guest) {
      setGuest(guest);
    } else {
      getGuest(id)
        .then((res) => {
          if (res.data?.status !== GuestStatus.CONFIRMED)
            navigate(`/guest/${id}`);
          setGuest(res.data);
        })
        .finally(() => setLoading(false));
    }
  }, [id, navigate, guest, setGuest]);

  const handleDownloadPdf = async () => {
    if (!containerRef.current) return;

    try {
      setShowButton(false);
      await new Promise((r) => setTimeout(r, 50));

      const canvas = await html2canvas(containerRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const pxToMm = (px: number) => px * 0.264583;

      const imgWidthMm = pxToMm(canvas.width);
      const imgHeightMm = pxToMm(canvas.height);

      const pdf = new jsPDF('p', 'mm', [imgWidthMm, imgHeightMm]);

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidthMm, imgHeightMm);

      pdf.setTextColor(0, 0, 255);
      pdf.textWithLink('____________________', 28, imgHeightMm - 16, {
        url: 'https://maps.app.goo.gl/YRZa43zpsPZp9fqn7',
      });

      pdf.save('convite-daniel-e-rafaella.pdf');
      setShowButton(true);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!qrCode) return <p>QR Code não encontrado</p>;
  if (!guest) return <p>Convidado não encontrado</p>;

  return (
    <div className="qr-code-container" ref={containerRef}>
      <LogoHeader />

      <div className="qr-code-content">
        <h3 style={{ margin: '0' }}>Obrigado pela confirmação! ✨</h3>
        <img src={qrCode} alt="QR Code" style={{ maxWidth: '100%' }} />
        {showButton && (
          <div className="qr-code-download">
            <button onClick={handleDownloadPdf} className="download-button">
              <FileDown size={22} />
              Baixar convite
            </button>
          </div>
        )}
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
