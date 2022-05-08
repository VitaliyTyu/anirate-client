import React, {FC, ReactElement, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Client} from "../../../api/api";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";

const LoginForm: FC = (): ReactElement => {
    const {error, loading, isAuth} = useTypedSelector(state => state.auth)
    const {login} = useActions()
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
        console.log(localStorage.getItem('token'))
    };

    if (loading) {
        return <h1>Идет загрузка...</h1>
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <form id="loginform" onSubmit={loginSubmit}>
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="EmailInput"
                                    name="EmailInput"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <small id="emailHelp" className="text-danger form-text">
                                    {emailError}
                                </small>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <small id="passworderror" className="text-danger form-text">
                                    {passwordError}
                                </small>
                            </div>

                            <button
                                style={{marginTop: 10}}
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
}
export default LoginForm;
