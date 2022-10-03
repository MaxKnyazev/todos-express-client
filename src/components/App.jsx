import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import NotFound404 from '../pages/NotFound404';
import Registration from '../pages/Registration';
import Todos from '../pages/Todos';

import Layout from './Layout';

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />}/>
          <Route path='/auth/login' element={<Login />}/>
          <Route path='/auth/register' element={<Registration />}/>
          <Route path='/auth/logout' element={<HomePage />}/>
          <Route path='/todos' element={<Todos />}/>
          <Route path='*' element={<NotFound404 />}/>
        </Route>
      </Routes>

    </>
  );
}

export default App;
