import { useEffect, useState } from 'react';
import { createGuest, updateGuest } from '../services/api';
import { GuestType } from '../services/api';
import './GuestFormModal.css';

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
  }, [guest, open]);

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
    <div className="overlayStyle">
      <div className="modalStyle">
        <h3>{guest ? 'Editar Convite' : 'Novo Convite'}</h3>
        <form onSubmit={handleSubmit} className="formStyle">
          <label>Titulo:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título da família ou nome"
            required
          />
          <label>Nomes:</label>
          {names.map((name, i) => (
            <div key={i} className="name-input">
              <input
                value={name}
                onChange={(e) => handleNameChange(i, e.target.value)}
                required
                placeholder="Nome do convidado"
              />
              {names.length > 1 && (
                <button type="button" onClick={() => removeName(i)}>
                  X
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addName} className="form-button">
            + Adicionar nome
          </button>
          <button type="submit" className="form-button">
            {guest ? 'Atualizar convite' : 'Criar convite'}
          </button>
          <button type="button" onClick={onClose} className="cancel-button">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
