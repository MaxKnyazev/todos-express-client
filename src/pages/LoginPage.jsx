import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Login from '../components/Login';
// import authStore from '../storesMobx/authStore';
// import { observer } from 'mobx-react-lite';
import './LoginPage.css';

const LoginPage = () => {
  const { isAuth } = useSelector(state => state.auth);
  // const { isAuth } = authStore;
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
