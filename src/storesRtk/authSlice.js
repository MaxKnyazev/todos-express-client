import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axiosInstance';

export const actionSetUserAsync = createAsyncThunk(
  'auth/actionSetUserAsync',
  async function({email, password}, {rejectWithValue, dispatch}) {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password
      });

      console.log('actionSetUserAsync -- try -------------------------------');
      console.log(response);

      localStorage.setItem('token', response.data.accessToken);

      const payload = {
        isAuth: true,
        email: response.data.email,
        role: response.data.role,
        error: '',
        serverMessage: 'success',
      }

      dispatch(setUser(payload));

    } catch (error) {

      console.log('actionSetUserAsync -- catch -- ERROR ---------------------');
      console.log(error);

      const payload = {
        isAuth: false,
        email: '',
        role: '',
        serverMessage: error?.response?.data?.error,
      }

      dispatch(setUser(payload));

      return rejectWithValue(`actionSetUserAsync-- catch -- ERROR: ${error.message}`);
    }
  }
);

export const actionCurrentUserAsync = createAsyncThunk(
  'auth/actionCurrentUserAsync',
  async function(_, {rejectWithValue, dispatch}) {
      try {
        const response = await axiosInstance.get('/auth/currentUser', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });

        localStorage.setItem('token', response.data.accessToken);

        console.log('actionCurrentUserAsync -- try -------------------------------');
        console.log(response);

        const payload = {
          isAuth: true,
          email: response.data.user.email,
          role: response.data.user.role,
          error: '',
          serverMessage: 'success',
        }

        dispatch(setUser(payload));

      } catch (error) {
        console.log('actionCurrentUserAsync -- catch -- ERROR ---------------------');
        console.log(error);
        
        const payload = {
          isAuth: false,
          email: '',
          role: '',
          serverMessage: error?.response?.data?.error,
        }

        dispatch(setUser(payload));

        return rejectWithValue(`actionCurrentUserAsync -- catch -- ERROR: ${error.message}`);
      }
  }
);

const setError = (state, action) => {
  state.error = action.payload;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      role: 'user',
      email: '',
      serverMessage: '',
      error: '',
      isAuth: false,
    },
    reducers: {
        // action --> auth/setUser
        setUser(state, action) {
          state.email = action.payload.email;
          state.role = action.payload.role;
          state.serverMessage = action.payload.serverMessage;
          state.isAuth = action.payload.isAuth;
        },

        // action --> auth/logout
        logout(state, action) {
          state.role = 'user';
          state.email = '';
          state.serverMessage = '';
          state.error = '';
          state.isAuth = false;
        },
    },
    extraReducers: {
      [actionCurrentUserAsync.pending]: (state) => {
          // state.status = 'loading';
          state.error = null;
      },
      [actionSetUserAsync.pending]: (state) => {
          // state.status = 'loading';
          state.error = null;
      },
      // [fetchTodos.fulfilled]: (state, action) => {
      //     state.status = 'resolved';
      //     state.todos = action.payload;
      // },
      [actionCurrentUserAsync.rejected]: setError,
      [actionSetUserAsync.rejected]: setError,
  },
});

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;
