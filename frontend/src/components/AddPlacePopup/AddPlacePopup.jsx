import useValidation from "../../utils/useValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({ openState, onClose, onAddPlace }) {

  const {isInputValid, inputMessages, inputValues, isFormValid, handleChange, reset } = useValidation();

  function resetWhenClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: inputValues.name,
      link: inputValues.link
    }, reset)
  }

  return (
    <PopupWithForm
        name="add-element"
        title="Новое место"
        buttonText="Создать"
        openState = {openState}
        onClose = {resetWhenClose}
        isFormValid = {isFormValid}
        onSubmit = {handleSubmit}
    >
      <input
        type="text"
        className={`popup__input ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input_type_error'}`}
        id="new-element-name"
        required
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        onChange={handleChange}
        value={inputValues.name ? inputValues.name : ''}
      />
      <span className="popup__error-text" id="new-element-name-error">{inputMessages.name}</span>
      <input
        type="url"
        className={`popup__input ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_type_error'}`}
        id="new-element-img"
        required
        name="link"
        placeholder="Ссылка на картинку"
        onChange={handleChange}
        value={inputValues.link ? inputValues.link : ''}
      />
      <span className="popup__error-text" id="new-element-img-error">{inputMessages.link}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;