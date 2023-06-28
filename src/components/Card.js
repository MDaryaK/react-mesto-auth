import React from 'react';

function Card({ photo, showDelete, isLiked, onDelete, onLikeClick, onCardClick }) {
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
        {showDelete && (
          <button
            className="elements__trash"
            aria-label="active"
            type="button"
            onClick={() => onDelete(photo._id)}
          />
        )}
        <div className="elements__likes">
          <button
            className={`elements__like ${isLiked ? "elements__like_active" : ""}`}
            aria-label="active"
            type="button"
            onClick={onLikeClick}
          />
          <div className="elements__counter">{photo.likes.length}</div>
        </div>
      </div>
    </div>
  )
};

export default Card;