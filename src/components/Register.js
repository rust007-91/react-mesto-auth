import AuthWithForm from "./AuthWithForm";

function Register({ onSubmit, isLoading  }) {
    return (
        <AuthWithForm
            title="Регистрация"
            name="register"
            btnText="Зарегистрироваться"
            onSubmit={onSubmit}
            isLoading={isLoading}
        >

        </AuthWithForm>
    );
}

export default Register;
