import {NavLink} from "react-router-dom";

function AuthWithForm(props) {
    const { title, name, btnText, onSubmit } = props;

    return (
        <>
            <div className={`auth`}>
                <div className="auth__container">
                    <form
                        className={`auth__form`}
                        name={`form-${name}`}
                        noValidate
                        onSubmit={onSubmit}
                    >
                        <h2 className="auth__form-heading">{title}</h2>
                        {props.children}

                        <button type="submit" className="auth__form-submit">
                            {btnText}
                        </button>

                        <NavLink to="/sign-in" className={({isActive}) => {
                            return `auth__reg ${!isActive ? "auth__reg_active" : ""}`;
                        }
                        }>Уже зарегистрированы? Войти
                        </NavLink>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AuthWithForm;
