import './Modal.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string; // Optional className prop
}

const Modal = ({ children, onClose, className = ''}: ModalProps) => {
  return (
    <div className="modal-overlay">
      <div className={`modal-box ${className}`}>
        <button className="close-button" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
