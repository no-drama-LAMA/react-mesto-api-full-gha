
function Form({ name, title, buttonText, children, onSubmit, isFormValid={isFormValid} }) {
  
  return (
    <form
      className="popup__form"
      name={`${name}-form`}
      id={`${name}-form`}
      noValidate
      onSubmit={onSubmit}
    >
      <h2 className="popup__title">{title}</h2>
      {children}
      <button className={`popup__submit-button ${isFormValid ? ' ' : 'popup__submit-button_disabled'}`} type="submit">
        {buttonText}
      </button>
    </form>
  )
}

export default Form;