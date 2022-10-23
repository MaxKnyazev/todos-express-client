import { makeAutoObservable, runInAction } from 'mobx';
import { axiosInstance } from '../utils/axiosInstance';

class AuthStore {
  role = 'user';
  email = '';
  serverMessage = '';
  error = '';
  isAuth = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  logout() {
    console.log('AuthStore.logout() -- MobX---------------------');
    runInAction(() => {
      this.role = 'user';
      this.email = '';
      this.serverMessage = '';
      this.error = '';
      this.isAuth = false;
    })
  }

  setSuccessAuth(response) {
    console.log('AuthStore.setSuccessAuth(response) -- MobX---------------------');
    runInAction(() => {
      this.role = response.data.user.role;
      this.email = response.data.user.email;
      this.serverMessage = '*** Success';
      this.error = '';
      this.isAuth = true;
    })
  }

  setErrorAuth(error) {
    console.log('AuthStore.setErrorAuth(error) -- MobX---------------------');
    runInAction(() => {
      this.role = 'user';
      this.email = '';
      this.serverMessage = '*** Error';
      this.error = error.message;
      this.isAuth = false;
    })
  }

  async actionCurrentUserAsync() {
    try {
      console.log('actionCurrentUserAsync -- try MobX-------------------------------');
      const response = await axiosInstance.get('/auth/currentUser', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      
      console.log(response);

      localStorage.setItem('token', response.data.accessToken);
  
      this.setSuccessAuth(response);

    } catch (error) {
      console.log('actionCurrentUserAsync -- catch -- ERROR MobX---------------------');
      console.log(error);

      this.setErrorAuth(error);
    }
  }

  async actionSetUserAsync({email, password}) {
    try {
      console.log('actionSetUserAsync -- try MobX-------------------------------');
      const response = await axiosInstance.post('/auth/login', {
        email,
        password
      });
      
      console.log(response);

      localStorage.setItem('token', response.data.accessToken);
  
      this.setSuccessAuth(response);
      
    } catch (error) {
      console.log('actionSetUserAsync -- catch -- ERROR MobX---------------------');
      console.log(error);

      this.setErrorAuth(error);
    }
  }
}

export default new AuthStore();

// (UT) Mobx & React Полный курс 2021 -- 01-04




// class AuthStore {
//   role = 'user';
//   email = '';
//   serverMessage = '';
//   error = '';
//   isAuth = false;

//   constructor() {
//     makeAutoObservable(this)
//   }

//   logout() {
//     console.log('AuthStore.logout() -- MobX---------------------');
    
//       this.role = 'user';
//       this.email = '';
//       this.serverMessage = '';
//       this.error = '';
//       this.isAuth = false;
//   }

//******************************************** Generator */
//   *actionCurrentUserAsync() {
//     try {
//       const response = yield axiosInstance.get('/auth/currentUser', {
//         headers: {
//           authorization: `Bearer ${localStorage.getItem('token')}`,
//         }
//       });
  
//       localStorage.setItem('token', response.data.accessToken);
  
//       console.log('actionCurrentUserAsync -- try MobX-------------------------------');
//       console.log(response);
  
//         this.role = response.data.user.role;
//         this.email = response.data.user.email;
//         this.serverMessage = '*** Success';
//         this.error = '';
//         this.isAuth = true;

//     } catch (error) {
//       console.log('actionCurrentUserAsync -- catch -- ERROR MobX---------------------');
//       console.log(error);

//         this.role = 'user';
//         this.email = '';
//         this.serverMessage = '*** Error';
//         this.error = error.message;
//         this.isAuth = false;
//     }
//   }
