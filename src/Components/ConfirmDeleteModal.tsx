import './ConfirmDeleteModal.css';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
};

export function ConfirmDeleteModal({ open, onClose, onConfirm, title }: Props) {
  if (!open) return null;

  return (
    <div className="overlayStyle">
      <div className="modalStyle">
        <h3>Confirmar Exclusão</h3>
        <p>
          Tem certeza que deseja excluir{' '}
          <strong>{title || 'este convidado'}</strong>?
        </p>
        <div className="buttonGroup">
          <button onClick={onConfirm} className="confirm-button">
            Sim, excluir
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
