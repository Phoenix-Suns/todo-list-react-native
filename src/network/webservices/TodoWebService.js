import { URL_DOMAIN, ENDPOINT_TODO } from '../../config/WebServiceConfig';
import { METHOD_POST, HEADER, METHOD_GET } from '../../helpers/WebServiceHelper';
import responseTodoList from '../../data/fake/responseTodoList.json';
import firebase from 'firebase';

const TODO_REF = 'userId/todos';

export const fetchTodoList = (payload) => {
  // const url = URL_DOMAIN + ENDPOINT_TODO;
  // const header = { ...HEADER, Authorization: token };

  // const request = fetch(url, {
  //   method: METHOD_GET,
  //   headers: header,
  // })
  //   .then(response => response.json())
  //   .error(error => error);

  //???
  // const request = Promise.resolve(JSON.parse(responseIDOList))
  //   .then(response => response.json())
  //   .error(error => error);

  const request = firebase.database().ref(TODO_REF).once('value');
    //.on('value', snapshot => snapshot.val());
  return request;
};

export const createTodo = ({title, content, priority, dueTime}) => {
  const request = firebase.database().ref(TODO_REF)
    .push({title, content, priority, dueTime});
    // .then(response => response.json())
    // .catch(error => error);
  return request;
}

