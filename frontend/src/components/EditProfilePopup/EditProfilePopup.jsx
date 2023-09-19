import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useValidation from "../../utils/useValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditProfilePopup({ openState, onClose, onUpdateUser }) {
  const {isInputValid, inputMessages, inputValues, isFormValid, handleChange, reset, setInitialValue} = useValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setInitialValue("title", currentUser.name)
    setInitialValue("about", currentUser.about)
  },[currentUser, setInitialValue])

  function resetWhenClose() {
    onClose()
      reset({title: currentUser.name, about: currentUser.about})
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      title: inputValues.title,
      about: inputValues.about
    }, reset)
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      openState = {openState}
      onClose = {resetWhenClose}
      isFormValid = {isFormValid}
      onSubmit = {handleSubmit}
    >
      <input
        type="text"
        className={`popup__input ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__input_type_error'}`}
        id="change-profile-name"
        required
        name="title"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        onChange={handleChange}
        value={inputValues.title ? inputValues.title : ''}
      />
      <span className="popup__error-text" id="change-profile-name-error">{inputMessages.title}</span>
      <input
        type="text"
        className={`popup__input ${isInputValid.about === undefined || isInputValid.about ? '' : 'popup__input_type_error'}`}
        id="change-profile-about"
        required
        name="about"
        placeholder="О себе"
        minLength={2}
        maxLength={200}
        onChange={handleChange}
        value={inputValues.about ? inputValues.about : ''}
      />
      <span className="popup__error-text" id="change-profile-about-error">{inputMessages.about}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;