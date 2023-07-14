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
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

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

  async function handleCardCreate(name, link) {
    try {
      const data = await api.createNewCard(name, link);
      setCards((cards) => [data, ...cards]);

      closeAllPopups();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleLikeClick(cardId, isLiked) {
    try {
      const card = !isLiked ? await api.addLike(cardId) : await api.deleteLike(cardId);

      setCards((cards) => cards.map((item) => {
        if (item._id === card._id) {
          return card;
        }

        return item;
      }));
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdateAvatar(link) {
    try {
      await api.updateUserAvatar(link);

      setCurrentUser((user) => ({
        ...user,
        avatar: link
      }));

      closeAllPopups();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdateUser(data) {
    try {
      await api.setUserInfo(data);

      setCurrentUser((user) => ({
        ...user,
        ...data
      }));

      closeAllPopups();
    } catch (e) {
      console.log(e);
    }
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

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleCardCreate}
      />

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
    </CurrentUserContext.Provider>

  )
}
export default App;