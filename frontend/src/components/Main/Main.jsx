import { useContext } from "react";
import Card from "../Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCard, onCardDelete, cards, onCardLike}) {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main>
      {/*Профиль*/}
      <section className="profile">
        <div className="profile__main">
          <button className="profile__change-avatar-btn" type="button" onClick={onEditAvatar}>
            <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
          </button>
          <div className="profile__text">
            <div className="profile__wrapper">
              <h1 className="profile__profile-name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__profile-about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить место"
          onClick={onAddPlace}
        />
      </section>
      {/*Галерея*/}
      <section className="elements" aria-label="Галерея">
        {cards.map((data) => {
          return (
          <Card key={data._id} element={data} onCard={onCard} onCardDelete={onCardDelete} onCardLike={onCardLike}/>
          )
        })}
      </section>
    </main>
  );
}

export default Main;
