import React, { FC, ReactElement, useEffect, useState } from 'react';
import { RegisterViewModel } from '../../../api/api';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { register } from '../../../store/actions-creators/auth';
import css from "./RegisterPage.module.css"
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const RegisterPage: FC = (): ReactElement => {
    const { register } = useActions()
    const { error } = useTypedSelector(state => state.auth)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [name, setName] = useState("");

    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");


    const handleValidation = () => {
        let nameIsValid = false;
        let emailIsValid = false;
        let pwdIsValid = false;
        let isPwdConfirmed = false;

        setEmailError("");
        setPasswordError("");
        setNameError("");

        if (name.length < 2) {
            nameIsValid = false;
            setNameError("Минимальная длина имени 2 символа");
        } else if (name.length > 30) {
            nameIsValid = false;
            setNameError("Максимальная длина имени 30 символов");
        } else if (name.length <= 30 && name.length >= 2) {
            nameIsValid = true;
        }

        if (!emailAddress.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{1,7}$/)) {
            emailIsValid = false;
            setEmailError("Адрес введен неверно");
        } else {
            emailIsValid = true;
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

        if (password !== confirmPassword) {
            isPwdConfirmed = false;
            setPasswordError("Пароли не совпадают");
        } else {
            isPwdConfirmed = true;
        }

        let formIsValid = nameIsValid && pwdIsValid && isPwdConfirmed && emailIsValid;

        return formIsValid;
    };


    const registerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (handleValidation()) {
            let registerVm: RegisterViewModel = {
                emailAddress,
                password,
                confirmPassword,
                name: name,
            }
            register(registerVm)
        }
    };


    useEffect(() => {
        if (error !== null) {
            setEmailError(error.message);
        }
    }, [error])


    useEffect(() => {
        setEmailError("");
        setPassword("");
        setNameError("");
    }, [])


    return (
        <div className={css.App}>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <form onSubmit={registerSubmit}>

                            <div className="form-group">
                                <label>Имя пользователя</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="User Name"
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <small className="text-danger form-text">
                                    {nameError}
                                </small>
                            </div>

                            <div className="form-group">
                                <label>Адрес электронной почты</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="user@email.com"
                                    onChange={(event) => setEmailAddress(event.target.value)}
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

                            <div className="form-group">
                                <label>Повторите пароль</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="password"
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                />
                                <small className="text-danger form-text">
                                    {passwordError}
                                </small>
                            </div>



                            <div className="form-group">
                                <Button
                                    style={{ marginTop: 5 }}
                                    variant="outline-dark"
                                    className={css.button}
                                    type='submit'>
                                    Создать аккаунт
                                </Button>

                                <Link to={"/login"}>
                                    <label style={{ marginLeft: 20, marginTop: 5 }}>войти</label>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;