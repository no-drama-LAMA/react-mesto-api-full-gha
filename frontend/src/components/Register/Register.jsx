import { Link } from "react-router-dom";
import useValidation from "../../utils/useValidation";
import Form from "../Form/Form";

function Register({ name, title, buttonText, handleRegistration }) {
  const {isInputValid, inputMessages, inputValues, isFormValid, handleChange} = useValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegistration(inputValues.email, inputValues.password);
  }

  return (
    <main>
    <div className="register">
      <Form name={name} title={title} buttonText={buttonText} onSubmit={handleSubmit} isFormValid={isFormValid}>
      <input
          type="email"
          className={`popup__input ${isInputValid.email === undefined || isInputValid.email ? '' : 'popup__input_type_error'}`}
          id="register-email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={inputValues.email ? inputValues.email : ''}
        />
        <span className="popup__error-text" id="register-email-error">{inputMessages.email}</span>
        <input
          type="password"
          className={`popup__input ${isInputValid.password === undefined || isInputValid.password ? '' : 'popup__input_type_error'}`}
          id="register-password"
          name="password"
          placeholder="Пароль"
          required
          onChange={handleChange}
          value={inputValues.password ? inputValues.password : ''}
        />
        <span className="popup__error-text" id="register-email-error">{inputMessages.password}</span>
      </Form>
      <p className="register__signin">
        Уже зарегистрированы?&nbsp;
        <Link className="register__login-link" to="/sign-in">
          Войти
        </Link>
      </p>
    </div>
    </main>
  )
}

export default Register;