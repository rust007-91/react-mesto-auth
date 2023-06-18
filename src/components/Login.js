import AuthWithForm from "./AuthWithForm";
import {useState} from "react";

function Login({ onSubmit }) {
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
    }

    return(
        <AuthWithForm
            title="Вход"
            name="login"
            btnText="Войти"
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
                    onChange={ handleChange }
                    value={formValue.value}
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
                    onChange={ handleChange }
                    value={formValue.value}
                />
            </fieldset>
        </AuthWithForm>
    );
}

export default Login;