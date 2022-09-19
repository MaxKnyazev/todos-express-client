import { SET_USER } from './actionTypes';
import { axiosInstance } from '../utils/axiosInstance';

export const actionSetUser = ({ email, role, serverMessage }) => ({
  type: SET_USER,
  payload: {
    email,
    role,
    serverMessage,
  },
});

export const actionSetUserAsync = ({ email, password }) => {
  return async (dispatch) => {
    const setLogin = async () => {
      try {
        const response = await axiosInstance.post('/auth/login', {
          email,
          password
        });

        return {
          email: response.data.email,
          role: response.data.role,
          serverMessage: response.data,
        }
      } catch (error) {
        return {
          email: '',
          role: '',
          serverMessage: error.response.data.error,
        }
      }
    }

    // setLogin()
    //   .then(({ email, role, serverMessage }) => {dispatch(actionSetUser({ email, role, serverMessage }))})
    //   .catch(e => console.log(e));

    // const { email, role, serverMessage } = await setLogin();
    // dispatch(actionSetUser({ email, role, serverMessage }));

    dispatch(actionSetUser({...await setLogin()}));
  }
}

// const buttonSubmitHandler = async () => {
//   try {
//     const response = await axiosInstance.post('/users/login', {
//       email,
//       password
//     });
//     console.log(response);
//     setServerMessage(response.data);
//     dispatch(actionSetUser({
//       email: response.data.email,
//       role: response.data.role,
//     }))
//   } catch (error) {
//     console.log(error.response.status)
//     console.error(error);
//     setServerMessage(error.response.data.error);
//   }
// }






// export const actionGetTodosThunk = (thunkTodos) => ({
//   type: GET_TODOS_THUNK,
//   payload: thunkTodos,
// });

// export const actionGetTodosThunkAsync = () => {
//   return (dispatch) => {
//     async function fetchData() {
//       const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=7');
//       const todos = await response.json();
//       let correctTodos = [];
      
//       for (let todo of todos) {
//         let correctTodo = {
//           value: todo.title,
//           isDone: todo.completed,
//           isImportant: false,
//           isEdit: false,
//           id: todo.id,
//         }
//         correctTodos.push(correctTodo);
//       }
//       return correctTodos;
//     }
    
//     fetchData()
//       .then((correctTodos) => {dispatch(actionGetTodosThunk(correctTodos))})
//       .catch(e => console.log(e));
//   }
// }