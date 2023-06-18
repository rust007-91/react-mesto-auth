import alertOk from "../images/vector-rectangle-ok.svg"
import alertOff from "../images/vector-rectangle-off.svg"

function InfoTooltip({ title, name, isOpen, onClose, status }) {
    return (
        <>
            <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
                <div className="popup__container">
                    <div className="popup__register">
                        <img src={ status ? alertOk : alertOff }
                             className="popup__register_icon"
                             alt="иконка оповещения"
                        />
                        <h2 className="popup__register_heading">{title}</h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="popup__close"
                        type="button"
                        aria-label="кнопка закрыть попап"
                    ></button>
                </div>
            </div>
        </>
    );
}

export default InfoTooltip;