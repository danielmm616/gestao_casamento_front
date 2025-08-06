import { useEffect, useState } from 'react';
import { createGuest, updateGuest } from '../services/api';
import { GuestType } from '../services/api';

type Guest = {
  id?: string;
  title: string;
  type: number;
  names: string[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  guest?: Guest;
};

export function GuestFormModal({ open, onClose, onSave, guest }: Props) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState(GuestType.INDIVIDUAL);
  const [names, setNames] = useState<string[]>(['']);

  useEffect(() => {
    if (guest) {
      setTitle(guest.title);
      setType(guest.type);
      setNames(guest.names);
    } else {
      setTitle('');
      setType(GuestType.INDIVIDUAL);
      setNames(['']);
    }
  }, [guest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, type, names: names.filter((n) => n.trim()) };
    try {
      if (guest?.id) {
        await updateGuest(guest.id, payload);
      } else {
        await createGuest(payload);
      }
      onSave();
      onClose();
    } catch {
      alert('Erro ao salvar convidado');
    }
  };

  const handleNameChange = (i: number, value: string) => {
    const updated = [...names];
    updated[i] = value;
    setNames(updated);
  };

  const addName = () => setNames([...names, '']);
  const removeName = (i: number) =>
    setNames(names.filter((_, idx) => idx !== i));

  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>{guest ? 'Editar Convidado' : 'Novo Convidado'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título da família ou nome"
            required
          />
          <br />
          <label>
            Tipo:
            <select
              value={type}
              onChange={(e) => setType(Number(e.target.value))}
            >
              <option value={GuestType.INDIVIDUAL}>Individual</option>
              <option value={GuestType.FAMILY}>Família</option>
            </select>
          </label>
          <br />
          <label>Nomes:</label>
          {names.map((name, i) => (
            <div key={i}>
              <input
                value={name}
                onChange={(e) => handleNameChange(i, e.target.value)}
                required
              />
              {names.length > 1 && (
                <button type="button" onClick={() => removeName(i)}>
                  X
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addName}>
            + Adicionar nome
          </button>
          <br />
          <button type="submit">{guest ? 'Salvar' : 'Criar'}</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 8,
  width: '90%',
  maxWidth: 400,
};
