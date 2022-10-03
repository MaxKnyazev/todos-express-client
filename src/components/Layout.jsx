import { NavLink, Outlet } from "react-router-dom"
import { useSelector } from 'react-redux';

const Layout = () => {
  const { email: emailUser, isAuth } = useSelector(state => state.setUser);

  return (
    <>
      <header className='header'>
        <h1 className='header__logo'>logo</h1>

        <nav className='header__nav nav'>
          <ul className='nav__list'>
            { isAuth ? (
              <>
                <span>{emailUser}</span>
                <li className='nav__item'><NavLink className='nav__link' to='/auth/logout'>Logout</NavLink></li>
              </>
            ) : (
              <>
                <li className='nav__item'><NavLink className='nav__link' to='/auth/login'>Login</NavLink></li>
                <li className='nav__item'><NavLink className='nav__link' to='/auth/register'>Register</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <Outlet />

      <footer>2022 Max Knyazev</footer>
    </>
  )
}

export default Layout;