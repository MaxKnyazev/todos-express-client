import { all } from 'redux-saga/effects';
import { authWatcher } from './authSaga';
// import { delayWatcher } from './delaySaga';
// import { deltaWatcher } from './deltaSaga';

export function* rootWatcher() {
  yield all([
    authWatcher() 
    // delayWatcher(), 
    // deltaWatcher()
  ]);
}
