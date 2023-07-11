import PopupWithForm from "./PopupWithForm";
import React, {useState} from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar(link);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'change avatar'}
      onClose={onClose}
      onCloseMouse={onClose}
      onSubmit={handleSubmit}
      title={'Обновить аватар'}
      textSubmit={'Сохранить'}
    >
      <fieldset className="form__info">
        <input
          className="form__box form__box_type_link"
          type="url"
          value={link}
          name="src"
          placeholder="Ссылка на картинку"
          required=""
          onChange={(e) => setLink(e.currentTarget.value)}
        />
      </fieldset>
    </PopupWithForm>
  );
}