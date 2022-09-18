import './App.css';
import { useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { actionSetUserAsync } from '../userStore/actionCreaters';

function App() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  // const [ serverMessage, setServerMessage ] = useState('***********************');

  const dispatch = useDispatch();
  const { email: emailUser, role, serverMessage } = useSelector(state => state.setUser);
  console.log(emailUser);
  console.log(role);

  const buttonSubmitHandler = (email, password) => {
    try {
      // dispatch(actionSetUserAsync({ email, password }));

      // const response = await axiosInstance.post('/users/login', {
      //   email,
      //   password
      // });
      // console.log(response);
      // setServerMessage(response.data);
      // dispatch(actionSetUser({
      //   email: response.data.email,
      //   role: response.data.role,
      // }))
    } catch (error) {
      // console.log(error.response.status)
      // console.error(error);
      // setServerMessage(error.response.data.error);
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

        <button className="login__submit" onClick={() => dispatch(actionSetUserAsync({ email, password }))}>Submit</button>

        <span className="login__result">{JSON.stringify(serverMessage)}</span>
        <span className="login__result">{JSON.stringify(emailUser)}</span>
        <span className="login__result">{JSON.stringify(role)}</span>
      </section>
    </div>
  );
}

export default App;
