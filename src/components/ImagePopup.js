import { usePopupEscBtn } from "../utils/usePopupEscBtn.js";

function ImagePopup({
  card, isOpen, onClose, onCloseMouse
}) {

  usePopupEscBtn(isOpen, onClose);

  return (
    <div className={`popup popup_type_photo_${card + (isOpen && ' popup_opened')}`} onClick={onCloseMouse}>
      <div className="popup__picture-container">
        <button
          className="popup__close popup__close_type-photo"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <figure className="popup__figure">
          <img src={card.link} alt={card.name} className="popup__photo" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}


export default ImagePopup;

