import { useCallback } from "react";
import { usePopupEscBtn } from "../utils/usePopupEscBtn.js";

function PopupWithForm({
  name,
  title,
  children,
  textSubmit,
  isOpen,
  onClose,
  onCloseMouse,
  onSubmit
}) {

  usePopupEscBtn(isOpen, onClose);

  const handlePopupClick = useCallback(
    (event) => {
      if (event.target.classList.contains("popup")) {
        onCloseMouse();
      }
    },
    [onCloseMouse]
  );

  return (
    <div className={`popup popup_type_profile_${name + (isOpen && ' popup_opened')}`}
      onClick={handlePopupClick}
    >
      <div className="popup__container">
        <div>
          <button className="popup__close" type="button" onClick={onClose}></button>
          <form action="#" className="form" name={name} onSubmit={onSubmit}>
            <h2 className="form__title">{title}</h2>

            {children}

            <button className="form__save form__save_inactive" type="submit">
              {textSubmit}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};


export default PopupWithForm;
