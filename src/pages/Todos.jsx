// import { actionCurrentUserAsync } from '../userStore/actionCreaters';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { useEffect } from 'react';

const Todos = () => {
  // const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.setUser);

  // useEffect(() => {
    // dispatch(actionCurrentUserAsync());
  // }, [dispatch]);

  return (
    <>
      { !isAuth ? <Navigate to='/' replace={true}/> 
      : (
        <>
          <h1>Todos</h1>
        </>
      )}
    </>
  )
}

export default Todos;