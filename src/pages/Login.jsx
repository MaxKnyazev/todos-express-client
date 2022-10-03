import './Login.css';
import { useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { actionSetUserAsync } from '../userStore/actionCreaters';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();
  // const [ serverMessage, setServerMessage ] = useState('***********************');

  const dispatch = useDispatch();
  const { email: emailUser, role, serverMessage, isAuth } = useSelector(state => state.setUser);
  // console.log(emailUser);
  // console.log(role);

  const buttonSubmitHandler = (email, password) => {
    dispatch(actionSetUserAsync({ email, password }));
    if (isAuth) {
      // TODO: navigate перекидывает на HomePage моментально, не дожидаясь ответа от сервера. Нужно создать логику для navigate. 
      navigate('/');
    }
  }

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  }

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  }

  return (
    <div className="App">
      <h2 className="title">Login:</h2>
      <section className="login">

        <div className="wrapper">
          <label htmlFor="email">
            Email:
            <input className="login__input" id="email" type="text" value={email} onChange={emailInputHandler}/>
          </label>

          <label htmlFor="password">
            Password:
            <input className="login__input" id="password" type="text" value={password} onChange={passwordInputHandler}/>
          </label>
        </div>

        <button className="login__submit" onClick={() => {buttonSubmitHandler(email, password)}}>Submit</button>

        <div>
          <span className="login__result">{JSON.stringify(serverMessage.accessToken)}</span>
        </div>

        { serverMessage.error !== null ? (
          <span className="login__result">{JSON.stringify(serverMessage)}</span>
        ) : null}

        <span className="login__result">{JSON.stringify(emailUser)}</span>
        <span className="login__result">{JSON.stringify(role)}</span>
      </section>
    </div>
  );
}

export default Login;
