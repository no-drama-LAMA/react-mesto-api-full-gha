function Popup({ name, children, openState, onClose }) {
  return (
    <section className={`popup popup_type_${name} ${openState && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__container" onClick={((evt) => evt.stopPropagation())}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть форму"
          onClick={onClose}
        />
        {children}
      </div>
    </section>
  )
}

export default Popup;