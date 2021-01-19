import React, { Component } from 'react';
// import Counter from './components/Counter/';
// import Dropdown from './components/Dropdown/';
import ColorPicker from './components/ColorPicker/';
import TodoList from './components/TodoList';
import Form from 'components/Form';
import TodoEditor from 'components/TodoEditor';
import initialTodos from './todos.json';
import shortid from 'shortid';
import Filter from 'components/Filter';

const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'grey', color: '#607D88' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F5185' },
];

class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
  };

  addTodo = text => {
    console.log(text);
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };
    // создаем новый массив [...старый, элемент]
    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };
  // получаем доступ к данным формы
  formSubmitHandler = data => {
    console.log(data);
  };

  toggleComplitid = todoId => {
    console.log(todoId);

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { todos, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter),
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;
    // 1й вариант
    // const completedTodos = todos.filter(todo => todo.completed);
    // 2й вариант
    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  render() {
    const { todos, filter } = this.state;
    const totalTodoCount = todos.length;
    const filteredTodos = this.getVisibleTodos();
    const completedTodos = this.calculateCompletedTodos;
    // console.log(completedTodos);
    return (
      <>
        {/* // получаем доступ к данным формы */}
        <Form onSubmit={this.formSubmitHandler} />
        {/* <h1>Состояние компонента</h1> */}

        {/* <Counter initialValue={10}/> */}
        {/* <Dropdown/> */}
        <ColorPicker options={colorPickerOptions} />

        <div>
          <p>Общее кол-во туду: {totalTodoCount}</p>
          <p>Кол-во выполненных: {completedTodos}</p>
        </div>
        <TodoEditor onSubmit={this.addTodo} />

        <Filter value={filter} onChange={this.changeFilter} />
        <TodoList
          todos={filteredTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleComplitid}
        />
      </>
    );
  }
}

export default App;
