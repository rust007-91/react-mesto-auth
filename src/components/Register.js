import { useState } from "react";
import AuthWithForm from "./AuthWithForm";

function Register({ onSubmit }) {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    });

    //обработчик заполнения полей
    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit(formValue);
    };

    return (
        <AuthWithForm
            title="Регистрация"
            name="register"
            btnText="Зарегистрироваться"
            onSubmit={handleSubmit}
        >
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
                    type="text"
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
        </AuthWithForm>
    );
}

export default Register;
