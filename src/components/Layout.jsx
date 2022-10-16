import { Outlet } from 'react-router-dom';
import Header from './Header'
import './Layout.css';

const Layout = () => {
  return (
    <>
      <Header />
      <main className='main'>  
        <Outlet />
      </main>
      <footer className='footer'>Max Knyazev © 2022</footer>
    </>
  )
}

export default Layout;



//************************************************************************* */
// import { NavLink, Outlet } from "react-router-dom"
// import { useSelector, useDispatch } from 'react-redux';
// import { actionLogout } from '../userStore/actionCreaters';

// const Layout = () => {
//   const { email: emailUser, isAuth } = useSelector(state => state.setUser);
//   const dispatch = useDispatch();

//   const logoutHandler = () => {
//     console.log('logout');
//     dispatch(actionLogout());
//     localStorage.removeItem('token');
//   }

//   return (
//     <>
//       <header className='header'>
//         <h1 className='header__logo'>logo</h1>

//         <h3 className='header__logo'>isAuth === {isAuth ? 'true' : 'false'}</h3>

//         <nav className='header__nav nav'>
//           <ul className='nav__list'>
//             { isAuth ? (
//               <>
//                 <span className='nav__email'>{emailUser}</span>
//                 <li onClick={logoutHandler} className='nav__item'><NavLink className='nav__link' to='/'>Logout</NavLink></li>
//               </>
//             ) : (
//               <>
//                 <li className='nav__item'><NavLink className='nav__link' to='/auth/login'>Login</NavLink></li>
//                 <li className='nav__item'><NavLink className='nav__link' to='/auth/register'>Register</NavLink></li>
//               </>
//             )}
//           </ul>
//         </nav>
//       </header>
//       <Outlet />
//       <footer>2022 Max Knyazev</footer>
//     </>
//   )
// }

// export default Layout;
