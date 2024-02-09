import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import * as TodoActions from '../actions/todo.actions';
import { Todo } from 'src/app/model/todo.model';
import { TodoService } from 'src/app/service/todo.service';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      exhaustMap(() =>
        this.todoService
          .getTodos()
          .pipe(map((todos: Todo[]) => TodoActions.loadTodos({ todos })))
      )
    )
  );
}
