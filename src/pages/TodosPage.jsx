// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import authStore from '../storesMobx/authStore';
import { observer } from 'mobx-react-lite';

const Todos = () => {
  // const { isAuth } = useSelector(state => state.authReducer);
  const { isAuth } = authStore;
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

export default observer(Todos);
