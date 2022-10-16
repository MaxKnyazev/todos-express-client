import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import NotFoundPage from '../pages/NotFoundPage';
import Registration from '../pages/Registration';
import TodosPage from '../pages/TodosPage';
import { useSelector, useDispatch } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { actionCurrentUserAsync } from '../userStore/actionCreaters';

import Layout from './Layout';

const App = () => {
  const { isAuth } = useSelector(state => state.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCurrentUserAsync());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          { !isAuth && <Route index element={<HomePage />}/> }
          { isAuth && <Route index element={<TodosPage />}/> }
          <Route path='/auth/login' element={<Login />}/>
          <Route path='/auth/register' element={<Registration />}/>
          <Route path='/todos' element={<TodosPage />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;


//******************************************************************** */
// <>
// <Routes>
//   <Route path='/' element={<Layout />}>
//     <Route index element={<HomePage />}/>
//     <Route path='/auth/login' element={<Login />}/>
//     <Route path='/auth/register' element={<Registration />}/>
//     <Route path='/todos' element={<Todos />}/>
//     {isAuth && <Route path='/todos' element={<Navigate to='/todos' replace={true}/>}/>}
//     {!isAuth && <Route path='/todos' element={<Navigate to='/auth/login' replace={true}/>}/>}
//     <Route path='*' element={<NotFound404 />}/>
//   </Route>
// </Routes>
// </>
