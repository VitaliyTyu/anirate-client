import React, { FC, ReactElement, useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { LoginViewModel } from "../../../api/api";

const LoginPage: FC = (): ReactElement => {
    const { error } = useTypedSelector(state => state.auth)
    const { login } = useActions()
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleValidation = () => {
        let nameIsValid = false;
        let pwdIsValid = false;

        setEmailError("");
        setPasswordError("");

        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            nameIsValid = false;
            setEmailError("Адрес введен неверно");
        } else {
            setEmailError("");
            nameIsValid = true;
        }

        if (password.length < 4) {
            pwdIsValid = false;
            setPasswordError("Минимальная длина пароля 4 символа");
        } else if (password.length > 30) {
            pwdIsValid = false;
            setPasswordError("Максимальная длина пароля 30 символов");
        } else if (password.length <= 30 && password.length >= 2) {
            pwdIsValid = true;
        }

        let formIsValid = nameIsValid && pwdIsValid;

        return formIsValid;
    };



    const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (handleValidation()) {
            let loginVM: LoginViewModel = {
                emailAddress: email,
                password: password,
            }
            login(loginVM)
        }
    };

    useEffect(() => {
        if (error !== null) {
            setEmailError("Пользователь не найден");
        }
    }, [error])

    useEffect(() => {
        setEmailError("");
        setPassword("");
    }, [])


    return (
        <div className='App'>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <form onSubmit={loginSubmit}>
                            <div className="form-group">
                                <label>Адрес электронной почты</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="user@email.com"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <small className="text-danger form-text">
                                    {emailError}
                                </small>
                            </div>

                            <div className="form-group">
                                <label>Пароль</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <small className="text-danger form-text">
                                    {passwordError}
                                </small>
                            </div>

                            <button
                                style={{ marginTop: 10 }}
                                type="submit"
                                className="btn btn-primary">
                                Войти
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
