import { useEffect, useState } from 'react';
import {
  createGuest,
  GuestStatus,
  updateGuest,
  type IGuest,
} from '../services/api';
import './GuestFormModal.css';
import MaskedInput from 'react-text-mask';
import { formatCellphone } from '../utils';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  guest: IGuest | null;
};

export function GuestFormModal({ open, onClose, onSave, guest }: Props) {
  const [title, setTitle] = useState('');
  const [names, setNames] = useState<string[]>(['']);
  const [cellphone, setCellphone] = useState('');
  const [status, setStatus] = useState(GuestStatus.PENDING);

  const cellphoneMask = [
    '(',
    /[1-9]/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  useEffect(() => {
    if (guest) {
      setTitle(guest.title);
      setNames(guest.names);
      setStatus(guest.status);
      setCellphone(guest.cellphone ? formatCellphone(guest.cellphone) : '');
    } else {
      setTitle('');
      setNames(['']);
      setStatus(GuestStatus.PENDING);
      setCellphone('');
    }
  }, [guest, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      status,
      names: names.filter((n) => n.trim()),
      cellphone,
    };
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
          <MaskedInput
            key={open ? 'open' : 'closed'}
            mask={cellphoneMask}
            placeholder="(99) 99999-9999"
            value={cellphone}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, '');
              setCellphone(onlyNumbers);
            }}
            guide={false}
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
          >
            <option value="1">Pendente</option>
            <option value="2">Confirmado</option>
            <option value="3">Recusado</option>
            <option value="4">Presente no Evento</option>
          </select>
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
