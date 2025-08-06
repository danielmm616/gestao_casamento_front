/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getGuests, deleteGuest } from '../../services/api';
import { GuestFormModal } from '../../Components/GuestFormModal';
import { ConfirmDeleteModal } from '../../Components/ConfirmDeleteModal';

export function AdminPanel() {
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGuest, setEditingGuest] = useState<any | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState<any | null>(null);

  useEffect(() => {
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
    <div style={{ padding: 20 }}>
      <h2>Painel do Admin</h2>
      <button
        onClick={() => {
          setEditingGuest(null);
          setShowModal(true);
        }}
      >
        + Novo Convidado
      </button>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {guests.map((guest) => (
            <li key={guest.id}>
              {guest.title} ({guest.names.length} pessoas)
              <button
                onClick={() => {
                  setEditingGuest(guest);
                  setShowModal(true);
                }}
              >
                Editar
              </button>
              <button
                onClick={() => {
                  setGuestToDelete(guest);
                  setShowDeleteModal(true);
                }}
              >
                Excluir
              </button>
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
