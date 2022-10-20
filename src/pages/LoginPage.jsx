import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Login from '../components/Login';
import './LoginPage.css';

const LoginPage = () => {
  const { isAuth } = useSelector(state => state.authReducer);
  return (
    <div className='container'>
      {
        isAuth 
        ? <Navigate to='/todos' replace={true} />
        : <Login />
      }
    </div>
  );
};

export default LoginPage;
