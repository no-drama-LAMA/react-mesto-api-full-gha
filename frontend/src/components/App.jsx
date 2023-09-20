import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import { useCallback, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import { authorization, getUserInfo, registration } from "../utils/auth";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import Register from "./Register/Register";
import Login from "./Login/Login";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip/InfoTooltip";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState('');

  const [loggedIn, setLoggedIn] = useState(true);
  const [UserEmail, setUserEmail] = useState('');
  const [selectInfoToolTip, setSelectInfoToolTip] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const redirect = useNavigate();

  const setsCloseAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopupOpen(false)
    setIsCardDeletePopupOpen(false)
    setInfoToolTipOpen(false)
  }, [])

  const closeByPressEsc = useCallback((evt) => { 
    if (evt.key === 'Escape') { 
      setsCloseAllPopups()
      document.removeEventListener('keydown', closeByPressEsc)
    }; 
  }, [setsCloseAllPopups])

  const closeAllPopups = useCallback(() => {
    setsCloseAllPopups()
    document.removeEventListener('keydown', closeByPressEsc)
  }, [setsCloseAllPopups, closeByPressEsc])

  function setEventListeners() {
    document.addEventListener('keydown', closeByPressEsc)
  }

  useEffect(() => {
    if(localStorage.token) {
      getUserInfo(localStorage.token)
        .then((res) => {
          setUserEmail(res.data.email)
          setLoggedIn(true)
          redirect('/')
        })
        .catch((error) => console.error(`Ошибка при авторизации ${error}`))
    } else {
      setLoggedIn(false)
    }
  }, [redirect])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEventListeners()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    setEventListeners()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    setEventListeners()
  }

  function handleCardClick(element) {
    setSelectedCard(element);
    setImagePopupOpen(true);
    setEventListeners()
  }

  function handleCardDelete(elementId) {
    setDeletedCard(elementId)
    setIsCardDeletePopupOpen(true);
    setEventListeners()
  }

  useEffect(() => {
    if (loggedIn) {
    Promise.all([api.getUserInfo(localStorage.token), api.getInitialCards(localStorage.token)])
      .then(([userData, cardSet]) => {
        setCurrentUser(userData);
        setCards(cardSet);
      })
      .catch((error) => console.error(`Ошибка создания страницы ${error}`))
    }
  }, [loggedIn])

  function handleDeleteCard(evt) {
    evt.preventDefault()
    api.deleteCard(deletedCard, localStorage.token)
      .then(() => {
        setCards(cards.filter((element) => {
          return element._id !== deletedCard
        }))
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка удаления карточки ${error}`))
  }

  function handleCardLike(element) {
    const isLiked = element.likes.some(i => i === currentUser._id);
    
    api.likeCard(element._id, localStorage.token, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === element._id ? newCard : c));
    })
    .catch((error) => console.error(`Ошибка изменения лайка ${error}`))
  }

  function handleUpdateUser(data, reset) {
    api.setUserInfo(data, localStorage.token)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка изменения профиля ${error}`))
  }

  function handleUpdateAvatar(data, reset) {
    api.setAvatar(data, localStorage.token)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка обновления аватара ${error}`))
  }

  function handleAddPlaceSubmit(data, reset) {
    api.addNewCard(data, localStorage.token)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка добавления карточки ${error}`))
  }

  function handleRegistration({email, password}) {
    registration(email, password)
      .then(() => {
        setInfoToolTipOpen(true);
        setSelectInfoToolTip(true);
        setTimeout(redirect, 1000, '/sign-in');
      })
      .catch((error) => {
        setInfoToolTipOpen(true);
        setSelectInfoToolTip(false);
        console.error(`Ошибка регистрации ${error}`);
      })
  }

  function handleAuthorization({email, password}) {
    authorization(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        window.scrollTo(0, 0);
        redirect('/');
      })
      .catch((error) => {
        setInfoToolTipOpen(true)
        setSelectInfoToolTip(false);
        console.error(`Ошибка входа ${error}`)
      })
  }

  function quit() {
    setLoggedIn (false);
    localStorage.removeItem('token');
    redirect('sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header loggedIn={loggedIn} quit={quit} UserEmail={UserEmail}/>

      <Routes>

        <Route path='/' element={
          <ProtectedRoute loggedIn={loggedIn} >
            <Main 
              onEditProfile = {handleEditProfileClick}
              onAddPlace = {handleAddPlaceClick}
              onEditAvatar = {handleEditAvatarClick}
              onCard = {handleCardClick}
              onCardLike = {handleCardLike}
              onCardDelete = {handleCardDelete}
              cards = {cards}
            />
            {/*Попап редактирования профиля*/}
            <EditProfilePopup openState = {isEditProfilePopupOpen} onClose = {closeAllPopups} onUpdateUser = {handleUpdateUser}/>
            {/*Попап добавления элемента*/}
            <AddPlacePopup openState = {isAddPlacePopupOpen} onClose = {closeAllPopups} onAddPlace = {handleAddPlaceSubmit}/>
            {/*Попап удаления карточки*/}
            <PopupWithForm
              name="delete-element"
              title="Вы уверены?"
              buttonText="Да"
              openState = {isCardDeletePopupOpen}
              onClose = {closeAllPopups}
              onSubmit = {handleDeleteCard}
            />
            {/*Попап обновления аватара*/}
            <EditAvatarPopup openState = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onUpdateAvatar = {handleUpdateAvatar}/>

            {/*Попап раскрытия картинки*/}
            <ImagePopup name="image" card={selectedCard} openState = {isImagePopupOpen} onClose = {closeAllPopups}/>
          </ProtectedRoute>
        } />

        <Route path='/sign-up' element={
          <Register 
            name="register"
            title="Регистрация"
            buttonText="Зарегистрироваться" 
            handleRegistration = {handleRegistration}
          />
          } 
        />

        <Route path='/sign-in' element={
          <Login 
            name="login"
            title="Вход"
            buttonText="Войти" 
            handleAuthorization={handleAuthorization}/>
          } 
        />

        <Route path='*' element={
          <Navigate to='/' replace />
          } 
        />

      </Routes>

      <InfoTooltip name='InfoTooltip' openState={isInfoToolTipOpen} onClose = {closeAllPopups} selectInfoToolTip={selectInfoToolTip} />
      
      <Footer />
      
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;