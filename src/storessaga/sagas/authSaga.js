import { put, takeEvery, select, call } from 'redux-saga/effects';
import { LOGIN, CONFIRM} from '../actionTypes';
import { actionSetUserToStore } from '../actionCreaters';
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
      console.log(error.response.data.error);

// TODO ::***************************************************************************** */
// TODO :: разобраться с выводом ошибки, в консоли есть, а до стейта не доходит
// TODO ::***************************************************************************** */

      const payload = {
        email: '',
        role: '',
        serverMessage: '*** Error :: authSaga.js --> asyncLoginWorker --> catch',
        error: error.response.data.error,
        isAuth: false,
      }

      yield put(actionSetUserToStore(payload));
    }
}

export function* asyncConfirmWorker() {
// --> actionCurrentUserAsync

    try {
      const response = yield call(
        axiosInstance.get,
          '/auth/currentUser', 
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
            }
          }
      );

      console.log('actionCurrentUserAsync -- try -------------------------------');
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

      console.log('asyncConfirmWorker -- catch -- ERROR ---------------------');
      console.log(error);

      const payload = {
        email: '',
        role: '',
        serverMessage: '*** Error :: authSaga.js --> asyncConfirmWorker --> catch',
        error: error,
        isAuth: false,
      }

      yield put(actionSetUserToStore(payload));
    }
  }

export function* authWatcher() {
  yield takeEvery(LOGIN, asyncLoginWorker);
  yield takeEvery(CONFIRM, asyncConfirmWorker);
}


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
