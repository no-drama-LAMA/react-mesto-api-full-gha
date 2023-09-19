import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Card({ element, onCard, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = element.likes.some(i => i._id === currentUser);

  function handleLikeClick() {
    onCardLike(element);
  }

  return (
    <article className="element">
      {currentUser._id === element.owner && <button className="element__trash" onClick={() => {onCardDelete(element._id)}}/>}
      <img className="element__image" src={element.link} alt={element.name} onClick={() => onCard({name: element.name, link: element.link })}/>
      <div className="element__text">
        <h2 className="element__title" >{element.name}</h2>
        <div className="element__like-wrapper">
          <button
            type="button"
            className={`element__button-like ${isLiked === true && 'element__button-like_active'}`}
            aria-label="Мне нравится"
            onClick={handleLikeClick}
          />
          <p className="element__like-counter">{element.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
