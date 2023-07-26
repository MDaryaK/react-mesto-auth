import {Link} from "react-router-dom";
import React, {useState} from "react";
import Header from "./Header";

export default function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    onLogin(email, password);
  }

  return (
    <>
      <Header>
        <Link className="header__link" to="/sign-up">Регистрация</Link>
      </Header>
      <div className="auth">
        <h1 className="auth__title">Вход</h1>
        <form className="auth__form" onSubmit={handleLogin}>
          <input
            className="auth__form_input"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <input
            className="auth__form_input"
            type="password"
            value={password}
            placeholder="Пароль"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button className="auth__form_action">Войти</button>
        </form>
      </div>
    </>
  );
}