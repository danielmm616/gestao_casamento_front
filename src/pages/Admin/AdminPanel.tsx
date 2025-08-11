import { useEffect, useState } from 'react';
import {
  getGuests,
  deleteGuest,
  guestStatusMap,
  type IGuest,
} from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2, PlusCircle, QrCode } from 'lucide-react';
import './AdminPanel.css';
import {
  ConfirmDeleteModal,
  GuestFormModal,
  GuestViewModal,
  LogoHeader,
} from '../../Components';

export function AdminPanel() {
  const [guests, setGuests] = useState<IGuest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGuest, setEditingGuest] = useState<IGuest | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState<IGuest | null>(null);
  const [showGuestDetail, setShowGuestDetail] = useState<boolean>(false);
  const [viewGuest, setViewGuest] = useState<IGuest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const removeAccents = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const filteredGuests = guests.filter(
    (guest) =>
      removeAccents(guest.title.toLowerCase()).includes(
        removeAccents(searchTerm.toLowerCase()),
      ) ||
      guest.names.some((name: string) =>
        removeAccents(name.toLowerCase()).includes(
          removeAccents(searchTerm.toLowerCase()),
        ),
      ),
  );

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

  function logout() {
    localStorage.removeItem('token');
    navigate('/admin/login');
  }

  return (
    <div className="admin-panel">
      <LogoHeader />
      <div className="admin-header">
        <h2>Painel do Admin</h2>
        <input
          type="text"
          placeholder="Buscar convidado..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <p>
          Total de Convidados:{' '}
          {filteredGuests
            ?.map((g) => g.names.length)
            .reduce((a, b) => a + b, 0)}
        </p>
        <div className="admin-header-actions">
          <button
            className="admin-add-button"
            onClick={() => {
              setEditingGuest(null);
              setShowModal(true);
            }}
          >
            <PlusCircle size={30} />
            {'      '}Novo Convidado
          </button>
          <button
            className="admin-add-button"
            onClick={() => navigate('/guest-info/scanner')}
          >
            <QrCode size={30} />
            {'      '}Scan Convidado
          </button>
        </div>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="guest-list">
          {filteredGuests.map((guest) => (
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
                  onClick={() => {
                    setViewGuest(guest);
                    setShowGuestDetail(true);
                  }}
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
      <div>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
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
      <GuestViewModal
        open={showGuestDetail}
        guest={viewGuest}
        onClose={() => setViewGuest(null)}
      />
    </div>
  );
}
