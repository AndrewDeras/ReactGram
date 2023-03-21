import "./Auth.css";

//componetns
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";

//hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux
import { login, reset } from "../../slices/authSlice";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);


  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    };
    dispatch(login(user));
  };

  // clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login" >
      <h2>ReactGram</h2>
      <p className="subtitle">Faça login para ver o que há de novo.</p>
      <form onSubmit={handleSubmit} >
        <input type="text" placeholder="Email"
          onChange={({ target }) => setEmail(target.value)}
          value={email || ""} />
        <input type="password" placeholder="Senha"
          onChange={({ target }) => setPassword(target.value)}
          value={password || ""} />
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>Nao tem uma conta ? <Link to="/register">Clique aqui.</Link></p>
    </div>
  )
}

export default Auth