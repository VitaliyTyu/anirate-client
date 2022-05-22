import React, { FC, ReactElement, useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import css from "./LoginPage.module.css"
import { Button } from "react-bootstrap";


const LoginPage: FC = (): ReactElement => {
    const { error } = useTypedSelector(state => state.auth)
    const { login } = useActions()
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleValidation = () => {
        let formIsValid = true;

        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            formIsValid = false;
            setEmailError("Адрес введен неверно");
            return false;
        } else {
            setEmailError("");
            formIsValid = true;
        }

        if (password.length < 4) {
            formIsValid = false;
            setPasswordError(
                "Минимальная длина пароля - 4 символа"
            );
            return false;
        } else {
            setPasswordError("");
            formIsValid = true;
        }

        return formIsValid;
    };

    const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleValidation();
        login(email, password)
    };

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className={css.App}>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <form id="loginform" onSubmit={loginSubmit}>
                            <div className="form-group">
                                <label>Адрес электронной почты</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="EmailInput"
                                    name="EmailInput"
                                    aria-describedby="emailHelp"
                                    placeholder="user@email.com"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <small id="emailHelp" className="text-danger form-text">
                                    {emailError}
                                </small>
                            </div>

                            <div className="form-group">
                                <label>Пароль</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Пароль"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <small id="passworderror" className="text-danger form-text">
                                    {passwordError}
                                </small>
                            </div>

                            <Button
                                style={{ marginTop: 10 }}
                                type="submit"                                
                                variant="outline-dark" size="lg">
                                Войти
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
