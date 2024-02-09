import { Component } from '@angular/core';
import { Todo } from '../model/todo.model';
import { Store } from '@ngrx/store';
import { addTodo , removeTodo, toggleTodo} from '../store/actions/todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  newTodoTitle: string = '';
  todos$!: Todo[];

   constructor(private store: Store<{todos: {todos: Todo[]}}>){
    store.select('todos').subscribe((todosState: {todos: Todo[]}) => {
      this.todos$ = todosState.todos;
      console.log(this.todos$);
    });
   }
  addTodo() {
    if(this.newTodoTitle.trim()===''){
      return;
    }
    const todo: Todo = {
      id : Date.now().toString(),
      title: this.newTodoTitle,
      completed: false,
      userId: 1
    }
    this.store.dispatch(addTodo({todo}))
  }

  removeTodo(id: any) {
    console.log(id)
    this.store.dispatch(removeTodo({id}))
  }

  toggleTodo(id: any) {
    this.store.dispatch(toggleTodo({id}))
  }
}
