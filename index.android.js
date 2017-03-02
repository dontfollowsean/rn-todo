/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Todo } from './src/app/Todo'

const Main = () => (<Todo/>);
// export default class Main extends Component {
//
//   render() {
//     return (
//       <Todo/>
//     );
//   }
// }



AppRegistry.registerComponent('Todo', () => Main);
