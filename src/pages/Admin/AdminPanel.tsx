/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getGuests, deleteGuest, guestStatusMap } from '../../services/api';
import { GuestFormModal } from '../../Components/GuestFormModal';
import { ConfirmDeleteModal } from '../../Components/ConfirmDeleteModal';
import { Eye, Pencil, Trash2, PlusCircle } from 'lucide-react';
import './AdminPanel.css';

export function AdminPanel() {
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGuest, setEditingGuest] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState<any | null>(null);
  // const [viewGuest, setViewGuest] = useState<any | null>(null);

  useEffect(() => {
    document.title = 'D&R | Painel Admin';
    loadGuests();
  }, []);

  async function loadGuests() {
    try {
      const res = await getGuests();
      setGuests(res.data);
    } catch {
      alert('Erro ao carregar convidados');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-panel">
      <div style={{ width: '100%', textAlign: 'center' }}>
        <img
          className="guest-response-image"
          src={'/src/assets/logo.png'}
          alt={`logo.png`}
          style={{
            maxWidth: '90%',
            maxHeight: '150px',
            margin: '0 auto',
            paddingTop: '1rem',
          }}
        />
      </div>
      <div className="admin-header">
        <h2>Painel do Admin</h2>
        <p>
          Total de Convidados:{' '}
          {guests?.map((g) => g.names.length).reduce((a, b) => a + b, 0)}
        </p>
        <button
          className="admin-add-button"
          onClick={() => {
            setEditingGuest(null);
            setShowModal(true);
          }}
        >
          <PlusCircle size={18} />
          {'      '}Novo Convidado
        </button>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="guest-list">
          {guests.map((guest) => (
            <li className="guest-item" key={guest.id}>
              <div className="guest-info">
                <strong>{guest.title}</strong>
                <small> {guest.names.length} pessoa(s)</small>
                <small>Status: {guestStatusMap.get(guest.status)}</small>
              </div>
              <div className="guest-actions">
                <button
                  className="icon-button"
                  title="Ver detalhes"
                  onClick={() => alert(JSON.stringify(guest, null, 2))} // Substitua por modal futuramente
                >
                  <Eye size={15} />
                </button>
                <button
                  className="icon-button"
                  title="Editar"
                  onClick={() => {
                    setEditingGuest(guest);
                    setShowModal(true);
                  }}
                >
                  <Pencil size={15} />
                </button>
                <button
                  className="delete-button"
                  title="Excluir"
                  onClick={() => {
                    setGuestToDelete(guest);
                    setShowDeleteModal(true);
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <GuestFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={loadGuests}
        guest={editingGuest}
      />
      <ConfirmDeleteModal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setGuestToDelete(null);
        }}
        onConfirm={async () => {
          if (guestToDelete?.id) {
            await deleteGuest(guestToDelete.id);
            await loadGuests();
            setShowDeleteModal(false);
            setGuestToDelete(null);
          }
        }}
        title={guestToDelete?.title}
      />
    </div>
  );
}
