import {Link} from "react-router-dom";
import React, {useState} from "react";
import Header from "./Header";

export default function Register({ onRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    onRegister(email, password);
  }

  return (
    <>
      <Header>
        <Link className="header__link" to="/sign-in">Войти</Link>
      </Header>
      <div className="auth">
        <h1 className="auth__title">Регистрация</h1>
        <form className="auth__form" onSubmit={handleRegister}>
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
          <button className="auth__form_action">Зарегистрироваться</button>
          <Link className="auth__form_forgot" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    </>
  );
}