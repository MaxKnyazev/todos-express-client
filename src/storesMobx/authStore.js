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
    this.role = response.data.user.role;
    this.email = response.data.user.email;
    this.serverMessage = '*** Success';
    this.error = '';
    this.isAuth = true;
  }

  setErrorAuth(error) {
    console.log('AuthStore.setErrorAuth(error) -- MobX---------------------');
    this.role = 'user';
    this.email = '';
    this.serverMessage = '*** Error';
    this.error = error.message;
    this.isAuth = false;
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
  
      runInAction(this.setSuccessAuth(response));
    } catch (error) {
      console.log('actionCurrentUserAsync -- catch -- ERROR MobX---------------------');
      console.log(error);

      runInAction(this.setErrorAuth(error));
    }
  }

  //TODO :: -- 1) actionSetUserAsync
  //TODO :: -- 2) проверить подключение МовХ во всех нужных модулях
  //TODO :: -- 3) observer во всех нужных модулях
  //TODO :: +- 4) <unnamed action> ???

  // export const actionSetUserAsync = createAsyncThunk(
  //   'auth/actionSetUserAsync',
  //   async function({email, password}, {rejectWithValue, dispatch}) {
  //     try {
  //       const response = await axiosInstance.post('/auth/login', {
  //         email,
  //         password
  //       });
  
  //       console.log('actionSetUserAsync -- try -------------------------------');
  //       console.log(response);
  
  //       localStorage.setItem('token', response.data.accessToken);
  
  //       const payload = {
  //         isAuth: true,
  //         email: response.data.user.email,
  //         role: response.data.user.role,
  //         error: '',
  //         serverMessage: 'success',
  //       }
  
  //       dispatch(setUser(payload));
  
  //     } catch (error) {
  
  //       console.log('actionSetUserAsync -- catch -- ERROR ---------------------');
  //       console.log(error);
  
  //       const payload = {
  //         isAuth: false,
  //         email: '',
  //         role: '',
  //         serverMessage: error?.response?.data?.error,
  //       }
  
  //       dispatch(setUser(payload));
  
  //       return rejectWithValue(`actionSetUserAsync-- catch -- ERROR: ${error.message}`);
  //     }
  //   }
  // )

















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
