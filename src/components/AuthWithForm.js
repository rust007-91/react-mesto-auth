import {NavLink} from "react-router-dom";
import {useState} from "react";

function AuthWithForm(props) {
    const { title, name, btnText, onSubmit, isLoading } = props;

    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    });

    const handleChange = (evt) => {
        const {name, value} = evt.target;

        setFormValue({
            ...formValue,
            [name]: value,
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit(formValue);
    };

    return (
        <>
            <div className={`auth`}>
                <div className="auth__container">
                    <form
                        className={`auth__form`}
                        name={`form-${name}`}
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <h2 className="auth__form-heading">{title}</h2>
                        {props.children}

                        <fieldset className="auth__form-fieldset">
                            <input
                                id="email_auth"
                                type="email"
                                className="auth__input"
                                name="email"
                                placeholder="Email"
                                required
                                onChange={handleChange}
                                value={formValue.email}
                            />
                            <input
                                id="password_auth"
                                type="password"
                                className="auth__input"
                                name="password"
                                placeholder="Пароль"
                                minLength="2"
                                maxLength="200"
                                required
                                onChange={handleChange}
                                value={formValue.password}
                            />
                        </fieldset>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="auth__form-submit">
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
