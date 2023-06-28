import React, {useEffect} from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false)
  const [isPopupClose, setIsPopupClose] = React.useState(false)
  const [isImagePopupOpened, setIsImagePopupOpened] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
  });
  const [cardDeleteNumb, setCardDeleteNumb] = React.useState('')
  const [cards, setCards] = React.useState([]);

  useEffect(() => getCards(), []);

  const getCards = () => {
    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards)
      })
      .catch(errorMessage => {
        console.error(`Повторите запрос ${errorMessage}`)
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpened(true);
    setSelectedCard(card);
  };

  function handlePopupClick() {
    setIsPopupClose(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPopupClose(false);
    setIsDeleteCardPopupOpen(false);
    setIsImagePopupOpened(false);
    setSelectedCard({
      name: '',
      link: ''
    })
  }

  function handleDeletePopup(cardId) {
    setCardDeleteNumb(cardId)
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardDelete(event) {
    event.preventDefault();
    api
      .deleteCard(cardDeleteNumb)
      .then(() => {
        setCards((cards) => cards.filter(item => {
          return item._id !== cardDeleteNumb;
        }));
        closeAllPopups()
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  }

  function handleCardCreate(event) {
    event.preventDefault();

    const name = event.target[1].value;
    const link = event.target[2].value;

    api
      .createNewCard(name, link)
      .then(() => {
        getCards();
        closeAllPopups();
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  }

  function handleLikeClick(cardId) {
    api
      .addLike(cardId)
      .then(() => {
        getCards();
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  }

  function handleDisLikeClick(cardId) {
    console.log('dislike');
    api
      .deleteLike(cardId)
      .then(() => {
        getCards();
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  }

  return (
    <>
      <div className="page">

        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDeleteCard={handleDeletePopup}
          onLikeClick={handleLikeClick}
          onDisLikeClick={handleDisLikeClick}
          onClose={handlePopupClick}
        />

        <Footer />

      </div>
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        name={'Profile'}
        onClose={closeAllPopups}
        onCloseMouse={closeAllPopups}
        title={'Редактировать профиль'}
        textSubmit={'Сохранить'}
      >
        <fieldset className="form__info">
          <input
            id="form-name"
            type="text"
            className="form__box form__box_type_name"
            minLength={2}
            maxLength={40}
            placeholder="Введите имя"
            name="name"
            required=""
          />
          <span className="form__error form-name-error" />
          <input
            id="form-job"
            type="text"
            className="form__box form__box_type_about"
            minLength={2}
            maxLength={200}
            placeholder="О себе"
            name="about"
            required=""
          />
          <span className="form__error form-job-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        name={'create place'}
        onClose={closeAllPopups}
        onCloseMouse={closeAllPopups}
        onSubmit={handleCardCreate}
        title={'Новое место'}
        textSubmit={'Создать'}
      >
        <fieldset className="form__info">
          <input
            type="text"
            className="form__box form__box_type_name"
            id="form-place"
            name="place"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required=""
          />
          <span className="form__error form-place-error form__error_active">
          </span>
          <input
            type="url"
            className="form__box form__box_type_link"
            id="form-url"
            name="url"
            placeholder="Ссылка на картинку"
            required=""
          />
          <span className="form__error form-web-error form__error_active">
          </span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isDeleteCardPopupOpen}
        name={'delete card'}
        onClose={closeAllPopups}
        onCloseMouse={closeAllPopups}
        onSubmit={handleCardDelete}
        title={'Вы уверены?'}
        textSubmit={'Да'}
      >
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        name={'change avatar'}
        onClose={closeAllPopups}
        title={'Обновить аватар'}
        textSubmit={'Сохранить'}
      >
        <fieldset className="form__info">
          <input
            type="url"
            className="form__box form__box_type_link"
            id="form-src"
            name="src"
            placeholder="Ссылка на картинку"
            required=""
          />
        </fieldset>
      </PopupWithForm>

      <ImagePopup
        name={'popup__photo'}
        isOpen={isImagePopupOpened}
        onClose={closeAllPopups}
        onCloseMouse={closeAllPopups}
        card={selectedCard}
      />
      <template id="card_template" />
    </>

  )
}
export default App;