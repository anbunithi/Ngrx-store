import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../model/todo.model';
import {
  addTodo,
  toggleTodo,
  removeTodo,
  loadTodos,
} from '../actions/todo.actions';

export interface TodosState {
  todos: Todo[];
}

export const initialState: TodosState = {
  todos: [
  ],
};

export const TodosReducer = createReducer(
  initialState,
  on(addTodo, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
  })),
  on(removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  on(toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),
  on(loadTodos, (state, { todos }) => ({
    ...state,
    todos,
  }))
);
