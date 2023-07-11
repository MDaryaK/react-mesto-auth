import React, {useEffect} from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api';
import {CurrentUserContext} from "../contexts/CurrentUser";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false)
  const [isImagePopupOpened, setIsImagePopupOpened] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
  });
  const [cardDeleteNumb, setCardDeleteNumb] = React.useState('');

  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    getCards();

    api.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      }).catch(errorMessage => {
        console.error(`Повторите запрос ${errorMessage}`)
      })
  }, []);

  const getCards = () => {
    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      }).catch(errorMessage => {
        console.error(`Повторите запрос ${errorMessage}`)
      })
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
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
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

  function handleLikeClick(cardId, isLiked) {
    const likePromise = !isLiked ? api.addLike(cardId) : api.deleteLike(cardId);

    likePromise
      .then(() => {
        getCards();
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  }

  async function handleUpdateAvatar(link) {
    try {
      await api.updateUserAvatar(link);

      setCurrentUser((user) => ({
        ...user,
        avatar: link
      }));
    } catch (e) {
      console.log(e);
    }

    closeAllPopups();
  }

  async function handleUpdateUser(data) {
    try {
      await api.setUserInfo(data);

      setCurrentUser((user) => ({
        ...user,
        ...data
      }));
    } catch (e) {
      console.log(e);
    }

    closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
        />

        <Footer />

      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

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

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup
        name={'popup__photo'}
        isOpen={isImagePopupOpened}
        onClose={closeAllPopups}
        onCloseMouse={closeAllPopups}
        card={selectedCard}
      />
      <template id="card_template" />
    </CurrentUserContext.Provider>

  )
}
export default App;