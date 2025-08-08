import { guestStatusMap, type IGuest } from '../services/api';
import { GuestNamesList } from './GuestNamesList';
import './GuestViewModal.css';
import { Copy, Link } from 'lucide-react';
import { toast } from 'sonner';

interface GuestViewModalProps {
  open: boolean;
  onClose: () => void;
  guest: IGuest | null;
}

export function GuestViewModal({ open, onClose, guest }: GuestViewModalProps) {
  if (!open || !guest) return null;
  const linkDoConvite = `${window.location.origin}/guest/${guest.id}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(linkDoConvite);
    toast.success('Link copiado!');
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Detalhes do Convite</h2>
        <p>
          <strong>Título:</strong> {guest.title}
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0',
            padding: '0',
          }}
        >
          <p style={{ margin: '0', padding: '0' }}>
            <strong>Convidados:</strong>
          </p>
          <GuestNamesList names={guest.names} />
        </div>
        <p>
          <strong>Status:</strong> {guestStatusMap.get(guest.status)}
        </p>

        <div className="link-container">
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <a
              href={linkDoConvite}
              target="_blank"
              style={{ fontWeight: 'bold', textDecoration: 'underline' }}
            >
              <Link size={15} /> Link do convite
            </a>
            <button onClick={handleCopy} className="copy-button">
              <Copy size={15} /> Copiar Link
            </button>
          </div>
        </div>

        <button className="close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
