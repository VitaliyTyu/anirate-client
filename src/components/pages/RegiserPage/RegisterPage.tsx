import React, { useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { register } from '../../../store/actions-creators/auth';

const RegisterPage = () => {
    const { register } = useActions()
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const { error } = useTypedSelector(state => state.auth)


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

        if (password !== confirmPassword) {
            formIsValid = false;
            setPasswordError(
                "Пароли не совпадают"
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
        register(email, password, confirmPassword)
    };

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div className="App">
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

                            <div className="form-group">
                                <label>Повторите пароль</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Пароль"
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                />
                                <small id="passworderror" className="text-danger form-text">
                                    {passwordError}
                                </small>
                            </div>

                            <button
                                style={{ marginTop: 10 }}
                                type="submit"
                                className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;