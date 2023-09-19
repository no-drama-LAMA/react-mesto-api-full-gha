import { useRef } from "react";
import useValidation from "../../utils/useValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({ openState, onClose, onUpdateAvatar }) {
  const {isInputValid, inputMessages, inputValues, isFormValid, handleChange, reset } = useValidation();
  const input = useRef()

  function resetWhenClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: input.current.value
    }, reset)
  }

  return (
    <PopupWithForm
        name="change-avatar"
        title="Обновить аватар"
        buttonText="Создать"
        openState = {openState}
        onClose = {resetWhenClose}
        isFormValid = {isFormValid}
        onSubmit = {handleSubmit}
      >
        <input
          type="url"
          className={`popup__input ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_type_error'}`}
          id="avatar"
          required
          name="avatar"
          placeholder="Ссылка на изображение"
          ref={input}
          onChange={handleChange}
          value={inputValues.avatar ? inputValues.avatar : ''}
        />
        <span className="popup__error-text" id="avatar-error">{inputMessages.avatar}</span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;