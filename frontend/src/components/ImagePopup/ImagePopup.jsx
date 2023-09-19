import Popup from "../Popup/Popup";

function ImagePopup({name, card, openState, onClose}) {
  return (
    <Popup name={name} openState={openState} onClose={onClose}>
      <img src={card.link} alt={card.name} className="popup__image" />
      <p className="popup__element-text">{card.name}</p>
    </Popup>
  )
}

export default ImagePopup;