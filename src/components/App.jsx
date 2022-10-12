import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import NotFound404 from '../pages/NotFound404';
import Registration from '../pages/Registration';
import Todos from '../pages/Todos';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Layout from './Layout';

const App = () => {
  const { isAuth } = useSelector(state => state.setUser);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />}/>
          <Route path='/auth/login' element={<Login />}/>
          <Route path='/auth/register' element={<Registration />}/>
          {isAuth && <Route path='/todos' element={<Todos />}/>}
          {!isAuth && <Route path='/todos' element={<Navigate to='/auth/login' replace={true}/>}/>}
          <Route path='*' element={<NotFound404 />}/>
        </Route>
      </Routes>

    </>
  );
}


export default App;

