import AuthWithForm from "./AuthWithForm";

function Login({ onSubmit, isLoading }) {
    return(
        <AuthWithForm
            title="Вход"
            name="login"
            btnText="Войти"
            onSubmit={onSubmit}
            isLoading={isLoading}
        >

        </AuthWithForm>
    );
}

export default Login;