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

