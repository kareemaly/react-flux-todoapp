import Dispatcher from "../dispatcher/AppDispatcher";
import {List, Map, fromJS} from "immutable";
import TodosConstants from "../constants/TodosConstants";
import {Observable, Subject} from "rx";

export interface ITodo extends Map<any, any> {}

export interface ITodos extends List<ITodo> {}

class TodoStore {

	private _todos: ITodos;
	private todosObservable: Subject<ITodos>;

	constructor() {
		this.todosObservable = new Subject<ITodos>();
	}

	public get todos() { 
		return this._todos;
	}
	public set todos(todos) {
		this._todos = List.isList(todos) ? todos : fromJS(todos);

		this.todosObservable.onNext(this._todos);
	}

	public getTodosObservable() {
		return this.todosObservable;
	}

	// Components need to subscribe for todos changes.. so let's expose an observable that will emit todos when they change
	// We know that whenever todos change we will set them (immutable) so the set method will be called. we can use that!
	public registerActionHandler() {
		Dispatcher.register((action: any) => {
			switch(action.actionType) {
				case TodosConstants.GET_ALL:
					this.getAll();
					break;
				case TodosConstants.CREATE:
					this.create(action.text);
					break;
				case TodosConstants.TOGGLE_COMPLETED:
					this.toggleCompleted(action.todo);
					break;
			}
		});
	}

	// This method will return an observable that gets todos from sever, we will simulate that with a delay
	private requestAllFromServer() {
		return Observable.return([
			{text: "Todo 1"},
			{text: "Todo 2"},
			{text: "Todo 3"},
			{text: "Todo 4"},
		]).delay(1000);
	}

	// It's private to make sure you call it using actions only!
	private getAll() {
		this.requestAllFromServer()
			.subscribe((todos: any) => {
				this.todos = todos;
			})
	}

	// We will simulate it too with a timer
	private create(text: string) {
		Observable.timer(1000)
			.take(1)
			.subscribe(() => {
				this.todos = this.todos.push(Map({ text }));
			})
	}

	private getTodoIndex(todo: ITodo) {
		return this.todos.findIndex((t) => t === todo);
	}

	private toggleCompleted(todo: ITodo) {
		let index = this.getTodoIndex(todo);

		this.todos = this.todos.update(index, (t) => {
			// Ok I forget to save after adding the return !
			return t.set('completed', !t.get('completed'));
		});
	}
}

export var todoStore = new TodoStore();