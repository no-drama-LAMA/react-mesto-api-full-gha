import Form from "../Form/Form";
import Popup from "../Popup/Popup";

function PopupWithForm({ name, title, buttonText, children, openState, onClose, onSubmit, isFormValid=true }) {

  return (
    <Popup name={name} openState={openState} onClose={onClose}>
      <Form name={name} title={title} buttonText={buttonText} onSubmit={onSubmit} isFormValid={isFormValid}>
        {children}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;