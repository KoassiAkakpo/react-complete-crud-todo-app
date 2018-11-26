import React, { Component } from "react";
import Todo from "./components/Todo";
import axios from "axios";
import loadingGif from "./loading.gif";
import "./App.css";

class App extends Component {
  state = {
    newTodo: "",
    editing: false,
    editingIndex: null,
    notification: null,
    todos: [],
    loading: true
  };

  apiUrl = "https://5bf7d3d85cd31800137928ee.mockapi.io";

  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`);
    this.setState({
      todos: response.data,
      loading: false
    });
  }

  alert = notification => {
    this.setState({ notification });
    setTimeout(() => {
      this.setState({ notification: null });
    }, 2000);
  };

  handleChange = event => {
    const newTodo = event.target.value;
    this.setState({ newTodo });
    //console.log(event.target.name, event.target.value);
  };
  /*
  generateId = () => {
    const lastTodo = this.state.todos[this.state.todos.length - 1];
    if (lastTodo) {
      return lastTodo.id + 1;
    }
    return 1;
  };
*/
  addTodo = async () => {
    const name = this.state.newTodo;

    const response = await axios.post(`${this.apiUrl}/todos`, {
      name
    });
    //console.log(response);

    if (!name) return;
    const todos = [...this.state.todos, response.data];
    this.setState({ todos, newTodo: "" });
    this.alert("Todo Succefully created");
  };

  deleteTodo = async index => {
    const todos = [...this.state.todos];
    const todo = todos[index];
    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

    todos.splice(index, 1);
    this.setState({ todos });
    this.alert("Todo Delete Succefully");
  };

  editingTodo = index => {
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    });
  };

  updateTodo = async () => {
    const todo = this.state.todos[this.state.editingIndex];
    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    });

    //if (!todo.name) return;
    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;
    this.setState({ todos, editing: false, editingIndex: null, newTodo: "" });
    this.alert("Todo Update Succefully");
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Complete CRUD App</h1>
        {this.state.notification && (
          <div className="alert alert-success mt-2">
            <h5 className="text-center">{this.state.notification}</h5>
          </div>
        )}
        <div className="form-group">
          <input
            name="todo"
            type="text"
            className="form-control"
            placeholder="Add new todo ..."
            onChange={this.handleChange}
            value={this.state.newTodo}
          />
          <button
            className="btn btn-info form-control mt-2"
            onClick={this.state.editing ? this.updateTodo : this.addTodo}
            disabled={this.state.newTodo.length < 5}
          >
            {this.state.editing ? "Update Todo" : "Add Todo"}
          </button>
          {this.state.loading && (
            <img src={loadingGif} alt="" className="loading" />
          )}
        </div>
        {!this.state.loading && !this.state.todos.length && (
          <h3 className="text-center mt-2">
            No todo to display!!! Add some todos...
          </h3>
        )}
        {(this.state.loading || !this.state.editing) && (
          <table className="table">
            <tbody>
              {this.state.todos.map((todo, index) => (
                <Todo
                  todo={todo}
                  index={index}
                  key={todo.id}
                  deleteTodo={this.deleteTodo}
                  editingTodo={this.editingTodo}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default App;
