import { useSelector } from 'react-redux';
import {
  selectModalIsOpen,
  selectModalText,
  selectModalOnCancel,
  selectModalOnConfirm,
} from '../../store/selectors';

export const Modal = () => {
  const isOpen = useSelector(selectModalIsOpen);
  const text = useSelector(selectModalText);
  const onConfirm = useSelector(selectModalOnConfirm);
  const onCancel = useSelector(selectModalOnCancel);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-overlay">
        <div className="modal-box">
          <span className="text-2xl font-semibold flex justify-center">{text}</span>
          <div className="modal-buttons">
            <button
              className="w-[80px] h-[30px] mr-1 rounded border-[1px] bg-gray-300 cursor-pointer"
              onClick={onConfirm}
            >
              Да
            </button>
            <button
              className="w-[80px] h-[30px] mr-1 rounded border-[1px] bg-gray-300 cursor-pointer"
              onClick={onCancel}
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
