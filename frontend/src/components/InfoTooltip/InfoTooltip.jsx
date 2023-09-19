import Popup from "../Popup/Popup";
import success from "../../images/success.png";
import fail from "../../images/fail.png";

function InfoTooltip ({ name, openState, onClose, selectInfoToolTip }) {
  return (
    <Popup name={name} openState={openState} onClose={onClose}>
      <div className="info-tool-tip">
        <img 
          src={`${selectInfoToolTip ? success : fail}`} 
          alt={`${selectInfoToolTip ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`} 
          className="info-tool-tip__image" 
        />
        <p className="info-tool-tip__text">{`${selectInfoToolTip ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}</p>
      </div>
    </Popup>
  )
}

export default InfoTooltip;