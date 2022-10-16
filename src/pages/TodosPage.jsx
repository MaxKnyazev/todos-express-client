import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Todos = () => {
  const { isAuth } = useSelector(state => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <section className='todos'>
      <h1>Todos</h1> 
    </section>
  )
}

export default Todos;




//********************************************************************** */
// // import { actionCurrentUserAsync } from '../userStore/actionCreaters';
// import { useSelector, useDispatch } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// // import { useEffect } from 'react';

// const Todos = () => {
//   // const dispatch = useDispatch();
//   const { isAuth } = useSelector(state => state.setUser);

//   // useEffect(() => {
//     // dispatch(actionCurrentUserAsync());
//   // }, [dispatch]);

//   //-----------------------------------------------------------?????????
//   return (
//     <>
//       { !isAuth && <Navigate to='/' replace={true}/> }
//       { isAuth && <h1>Todos</h1> }
//     </>
//   )
// }

// export default Todos;