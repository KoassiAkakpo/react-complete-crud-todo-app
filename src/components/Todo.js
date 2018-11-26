import React from "react";

const Todo = ({ todo, index, deleteTodo, editingTodo }) => {
  return (
    <tr>
      <td>{todo.name} </td>
      <td>
        <button
          onClick={() => editingTodo(index)}
          className="btn btn-primary mr-4"
        >
          Update
        </button>
        <button onClick={() => deleteTodo(index)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};
export default Todo;
