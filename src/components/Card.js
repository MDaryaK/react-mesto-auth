import React, {useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUser";

function Card({ photo, onDelete, onLikeClick, onCardClick }) {

  const user = useContext(CurrentUserContext);

  const isLiked = () => {
    const index = photo.likes.findIndex((item) => item._id === user._id);

    return index !== -1;
  }

  const isOwn = photo.owner._id === user._id;

  return (
    <div className="elements__item">
      <img
        className="elements__photo"
        src={photo.link}
        alt={photo.name}
        onClick={() => onCardClick({ name: photo.name, link: photo.link })}
      />
      <div className="elements__block">
        <h2 className="elements__title">{photo.name}</h2>
        {isOwn && (
          <button
            className="elements__trash"
            aria-label="active"
            type="button"
            onClick={() => onDelete(photo._id)}
          />
        )}
        <div className="elements__likes">
          <button
            className={`elements__like ${isLiked() ? "elements__like_active" : ""}`}
            aria-label="active"
            type="button"
            onClick={() => onLikeClick(photo._id, isLiked())}
          />
          <div className="elements__counter">{photo.likes.length}</div>
        </div>
      </div>
    </div>
  )
};

export default Card;
