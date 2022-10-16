import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actionLogout } from '../userStore/actionCreaters';
import './Header.css';

const Header = () => {
  const { email, isAuth } = useSelector(state => state.userState);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    // console.log('logout');
    dispatch(actionLogout());
    localStorage.removeItem('token');
  }

  return (
    <header className='header'>
      <h1 className='header__logo'>logo</h1>
      <h3 className='header__logo'>isAuth === {isAuth ? 'true' : 'false'}</h3>
      <nav className='header__nav nav'>
        <ul className='nav__list'>
          { 
            isAuth &&
            <>
              <span className='nav__email'>{email}</span>
              <li onClick={logoutHandler} className='nav__item'>
                <NavLink className='nav__link' to='/'>Logout</NavLink>
              </li>
            </>
          }
          {
            !isAuth &&
            <>
              <li className='nav__item'>
                <NavLink className='nav__link' to='/auth/login'>Login</NavLink>
              </li>
              <li className='nav__item'>
                <NavLink className='nav__link' to='/auth/register'>Register</NavLink>
              </li>
            </>
          }
        </ul>
      </nav>
    </header>
  )
}

export default Header;