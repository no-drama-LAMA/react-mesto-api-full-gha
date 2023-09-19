import useValidation from "../../utils/useValidation";
import Form from "../Form/Form";

function Login({ name, title, buttonText, handleAuthorization }) {
  const {isInputValid, inputMessages, inputValues, isFormValid, handleChange} = useValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleAuthorization(inputValues.email, inputValues.password)
  }

  return (
    <main>
      <div className="login">
        <Form name={name} title={title} buttonText={buttonText} onSubmit={handleSubmit} isFormValid={isFormValid}>
          <input
            type="email"
            className={`popup__input ${isInputValid.email === undefined || isInputValid.email ? '' : 'popup__input_type_error'}`}
            id="login-email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            value={inputValues.email ? inputValues.email : ''}
          />
          <span className="popup__error-text" id="login-email-error">{inputMessages.email}</span>
          <input
            type="password"
            className={`popup__input ${isInputValid.password === undefined || isInputValid.password ? '' : 'popup__input_type_error'}`}
            id="login-password"
            name="password"
            placeholder="Пароль"
            required
            onChange={handleChange}
            value={inputValues.password ? inputValues.password : ''}
          />
          <span className="popup__error-text" id="login-password-error">{inputMessages.loginpassword}</span>
        </Form>
      </div>
    </main>
  )
}

export default Login;