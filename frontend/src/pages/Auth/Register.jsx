import "./Auth.css";

//components
import { Link } from 'react-router-dom';

import { useState, useEffect } from "react";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    console.log(user);
  };

  return (
    <div id="register" >
      <h2>ReactGram</h2>
      <p className="subtitle">
        Cadastre-se para ver fotos dos seus amigos.
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome"
          onChange={({ target }) => setName(target.value)}
          value={name || ""} />
        <input type="email" placeholder="Email"
          onChange={({ target }) => setEmail(target.value)}
          value={email || ""} />
        <input type="password" placeholder="Senha"
          onChange={({ target }) => setPassword(target.value)}
          value={password || ""} />
        <input type="password" placeholder="Confirme a senha"
          onChange={({ target }) => setConfirmPassword(target.value)}
          value={confirmPassword || ""} />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/" >Clique aqui.</Link>
      </p>
    </div>
  )
}

export default Register