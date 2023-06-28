import React from 'react';
import { api } from '../utils/api.js';
import Card from './Card.js';

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onLikeClick,
  onDisLikeClick,
  onDeleteCard,
}) {

  const [user, setUser] = React.useState("");

  React.useEffect(() => {
    api.getUserInfo()
      .then((userInfo) => {
        setUser(userInfo);
      })
      .catch(errorMessage => {
        console.error(`Повторите запрос ${errorMessage}`)
      })
  }, []);

  const isLiked = (card) => {
    const index = card.likes.findIndex((item) => item._id === user._id);

    return index !== -1;
  }

  const handleLikeClick = (card) => {
    if (isLiked(card)) {
      onDisLikeClick(card._id);
      return;
    }

    onLikeClick(card._id);
  };

  return (
    <main className="main">
      <section className="profile">
        <button className="profile__avatar-button" type="button" onClick={onEditAvatar}>
          <img
            className="profile__photo"
            src={user?.avatar}
            alt="Аватар"
            style={{ backgroundImage: `url(${userAvatar})` }} 
          />
        </button>
        <div className="profile__info">
          <div className="profile__title-wrapper">
            <h1 className="profile__title">{user.name}</h1>
            <button className="profile__add-button" type="button" onClick={onEditProfile} />
          </div>
          <p className="profile__subtitle">{user.about}</p>
        </div>
        <button className="profile__button" aria-label="active" type="button" onClick={onAddPlace} />
      </section>
      <section className="elements">
        {cards.map(item => (
          <Card
            key={item._id}
            photo={item}
            isLiked={isLiked(item)}
            showDelete={item.owner._id === user._id}
            onCardClick={onCardClick}
            onLikeClick={() => handleLikeClick(item)}
            onDelete={onDeleteCard}
          />
        ))}

      </section>
    </main>


  )
};

export default Main;