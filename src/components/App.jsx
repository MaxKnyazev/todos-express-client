import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegistrationPage from '../pages/RegistrationPage';
import TodosPage from '../pages/TodosPage';
// import { actionCurrentUserAsync } from '../userStore/actionCreaters';
// import { actionCurrentUserAsync } from '../storesRtk/authSlice';
import authStore from '../storesMobx/authStore';
import { observer } from 'mobx-react-lite';
import Layout from './Layout';
import './App.css';

const App = () => {
  // const { isAuth } = useSelector(state => state.userState);
  // const { isAuth } = useSelector(state => state.authReducer);
  // const dispatch = useDispatch();

  const { isAuth, actionCurrentUserAsync } = authStore;

  useEffect(() => {
    actionCurrentUserAsync();
  }, [actionCurrentUserAsync]);

  // useEffect(() => {
  //   dispatch(actionCurrentUserAsync());
  // }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        { !isAuth && <Route index element={<HomePage />}/> }
        { isAuth && <Route index element={<TodosPage />}/> }
        <Route path='/auth/login' element={<LoginPage />}/>
        <Route path='/auth/register' element={<RegistrationPage />}/>
        <Route path='/todos' element={<TodosPage />}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Route>
    </Routes>
  );
}

export default observer(App);
