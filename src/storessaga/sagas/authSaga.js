import { put, takeEvery, select, call } from 'redux-saga/effects';
import { LOGIN, CONFIRM} from '../actionTypes';
import { actionSetUserToStore, actionErrorLogin, actionLogout } from '../actionCreaters';
import { axiosInstance } from '../../utils/axiosInstance';

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/*********************
 * export const actionSetUserToStore = ({ isAuth, email, role, error, serverMessage }) => ({
  type: SET_USER_TO_STORE,
  payload: {
    email,
    role,
    serverMessage,
    error,
    isAuth,
  },
});

export const actionLogout = () => ({
  type: LOGOUT,
});

export const actionErrorLogin = ({ error }) => ({
  type: ERROR_LOGIN,
  payload: {
    error,
  },
});
 */

export function* asyncLoginWorker(args) {
// --> actionSetUserAsync

// console.log(args.payload);
const {email, password} = args.payload;
// console.log(email);
// console.log(password);

    try {
      const response = yield call(
        axiosInstance.post,
          '/auth/login', 
          {
            email,
            password
          }
      );

      console.log('asyncLoginWorker -- try -------------------------------');
      console.log(response);

      localStorage.setItem('token', response.data.accessToken);

      const payload = {
        isAuth: true,
        email: response.data.user.email,
        role: response.data.user.role,
        error: '',
        serverMessage: 'success',
      }

      yield put(actionSetUserToStore(payload));

    } catch (error) {

      console.log('asyncLoginWorker -- catch -- ERROR ---------------------');
      console.log(error);

      const payload = {
        email: '',
        role: '',
        serverMessage: '*** Error :: authSaga.js --> asyncLoginWorker --> catch',
        error: error,
        isAuth: false,
      }

      yield put(actionSetUserToStore(payload));
    }
}

export function* asyncConfirmWorker() {
  // const state = yield select();
  // const stateDelta = state.deltaer.delta;
  // const stateDelay = state.delayer.delay;

  // console.log(`--- state ---> `);
  // console.log(state);
  
  // yield delay(stateDelay);
  // yield put(actionDec(stateDelta));
}

export function* authWatcher() {
  yield takeEvery(LOGIN, asyncLoginWorker);
  yield takeEvery(CONFIRM, asyncConfirmWorker);
}




// import { put, takeEvery, select } from 'redux-saga/effects';
// import { INC_ASYNC, DEC_ASYNC} from '../store/actionTypes';
// import { actionInc, actionDec } from '../store/actionCreaters';

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// function* asyncIncrementWorker() {
//   const state = yield select();
//   const stateDelta = state.deltaer.delta;
//   const stateDelay = state.delayer.delay;

//   console.log(`--- state ---> `);
//   console.log(state);
  
//   yield delay(stateDelay);
//   yield put(actionInc(stateDelta));
// }

// function* asyncDecrementWorker() {
//   const state = yield select();
//   const stateDelta = state.deltaer.delta;
//   const stateDelay = state.delayer.delay;

//   console.log(`--- state ---> `);
//   console.log(state);
  
//   yield delay(stateDelay);
//   yield put(actionDec(stateDelta));
// }

// export function* authWatcher() {
//   yield takeEvery(INC_ASYNC, asyncIncrementWorker);
//   yield takeEvery(DEC_ASYNC, asyncDecrementWorker);
// }




/***
 * Для саги необходим немного другой подход :
 * 
 * экшены делятся на 2 типа :
 * 
 * 1) экшены для вотчеров, по которым будут запускаться воркеры, 
 *    например INC_ASYNC и DEC_ASYNC
 * 
 * 2) все остальные экшены для стандартной работы с редюсером, 
 *    например INC и DEC, которые диспатчатся(put) воркерами
 *    yield put(actionDec(stateDelta))
 *    yield put(actionInc(stateDelta))
 * 
 * В воркерах реализуется асинхронность
 *    yield delay(stateDelay)
 */

/**
 * 
 * 
 * 








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
// );










 * 
 */