import { createStackNavigator, createAppContainer } from 'react-navigation';
import Splash from '../ui/Others/SplashUI/SplashUI';
import TodoList from '../ui/Todo/TodoList/TodoList'
import AddTodo from '../ui/Todo/AddTodo/AddTodo'
import UpdateTodo from '../ui/Todo/UpdateTodo/UpdateTodo';

const AppNavigator = createStackNavigator({
  
  Splash: {
    screen: Splash,
  },
  TodoList: {
    screen: TodoList,
  },
  AddTodo: {
    screen: AddTodo,
  },
  UpdateTodo: {
    screen: UpdateTodo,
  }
}, {
  initialRouteName: 'Splash',
  navigationOptions: ({ navigation }) => ({
    header: null,
  }),
});

const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;
