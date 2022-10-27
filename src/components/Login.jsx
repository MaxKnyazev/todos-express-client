import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { actionSetUserAsync } from '../userStore/actionCreaters';
// import { actionSetUserAsync } from '../storesRtk/authSlice';
import { actionLoginAsync } from '../storessaga/actionCreaters';

// import authStore from '../storesMobx/authStore';
// import { observer } from 'mobx-react-lite';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { role, user : emailUser, serverMessage, actionSetUserAsync } = authStore;

  const dispatch = useDispatch();
  const {
    email: emailUser,
    role,
    error,
    serverMessage,
  } = useSelector(state => state.auth);

  const buttonSubmitHandler = (email, password) => {
    console.log('buttonSubmitHandler')
    console.log('email, password |', email, password)
    dispatch(actionLoginAsync({email, password}));
  };

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <h2 className='title'>Login:</h2>
      <section className='login'>
        <div className='wrapper'>
          <label htmlFor='email'>
            Email:
            <input
              className='login__input'
              id='email'
              type='text'
              value={email}
              onChange={emailInputHandler}
            />
          </label>
          <label htmlFor='password'>
            Password:
            <input
              className='login__input'
              id='password'
              type='text'
              value={password}
              onChange={passwordInputHandler}
            />
          </label>
        </div>
        <button
          className='login__submit'
          onClick={() => {
            buttonSubmitHandler(email, password);
          }}
        >
          Submit
        </button>
        <div>
        </div>
        {serverMessage ? (
          <span className='login__result'>
            {JSON.stringify(serverMessage)}
          </span>
        ) : null}
        <span className='login__result'>{JSON.stringify(emailUser)}</span>
        <span className='login__result'>{JSON.stringify(role)}</span>
        {error ? (
          <span className='login__result'>
            {JSON.stringify(error)}
          </span>
        ) : null}
      </section>
    </>
  )
};

export default Login;



// TODO ::***************************************************************************** */
// TODO :: разобраться с выводом ошибки, в консоли есть, а до стейта не доходит
// TODO ::***************************************************************************** */
