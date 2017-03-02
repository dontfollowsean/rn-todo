import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export class Todo extends Component {

  constructor() {
    super();
    this.state ={
      todos: [],
      newTodo: ''
    }
  }

  componentWillMount() {
    fetch('http://localhost:5001/todos', {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(todos => this.setState({todos}))
  }

  handleChange(text) {
      this.setState({newTodo: text});
  }

  handlePress(e) {
    const newtodo = {
      name: this.state.newTodo
    };

    fetch('http://localhost:5001/todos/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newtodo)
    })
    .then(data => data.json())
    .then(json => {
      const todos = [...this.state.todos, newtodo];
      this.setState({todos, newTodo: ''})
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            Todos
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput style={styles.input} value={this.state.newTodo} onChangeText={this.handleChange.bind(this)}/>
          <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this)}>
            <Text style={styles.buttonText}>
              create
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.todos}>

            {this.state.todos.map((todo, i) => (
              <View key={i} style={styles.todo}>
                <Text style={styles.todoText}>{todo.name}</Text>
              </View>
            ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'blue'
  },
  form: {
    flexDirection: 'row',
    margin: 15
  },
  input: {
    flex: 0.7,
    height: 50,
    borderWidth: 1,
    borderColor: 'blue',
    fontWeight: 'bold',
    padding: 15
  },
  button: {
    flex: 0.3,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: 'blue',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  todos: {
    marginTop: 40
  },
  todo: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginBottom: 10
  },
  todoText: {
    fontSize: 24
  }

});
