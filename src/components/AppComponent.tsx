import * as React from "react";
import {todoStore, ITodos, ITodo} from "../stores/TodoStore";
import {List} from "immutable";
import TodosActions from "../actions/TodosActions";
import TodoListComponent from "./todos/TodoListComponent";
import TodoFormComponent from "./todos/TodoFormComponent";

interface IState {
	todos: ITodos;
}

export default class AppComponent extends React.Component<any, IState> {

	private todosSubscriber;

	componentWillMount() {
		this.setInitialState();

		this.subscribeToChanges();

		// One last thing we have to call an action to get todos
		TodosActions.getAll();
	}

	componentWillUnmount() {
		this.todosSubscriber.dispose();
	}

	setInitialState() {
		this.state = { todos: List([]) };
	}

	subscribeToChanges() {
		this.todosSubscriber = todoStore.getTodosObservable()
			.subscribe((todos) => {
				this.setState({ todos: todos });
			})
	}

	render() {
		return (
			<div>
				<h1>Typescript, React, Flux, Immutable in a Todo App!</h1>
				<hr />
				<TodoFormComponent />
				<TodoListComponent todos={this.state.todos} />
			</div>
		);
	}
}