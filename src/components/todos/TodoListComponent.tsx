import * as React from "react";
import {ITodos} from "../../stores/TodoStore";
import TodoItemComponent from "./TodoItemComponent";

interface IProps extends React.Props<TodoListComponent> {
	todos: ITodos;
}

export default class TodoListComponent extends React.Component<IProps, any> {

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.todos !== nextProps.todos;
	}

	render() {
		// Ok, sorry for that!
		return (
			<ul>
				{this.props.todos.map((todo, key) => {
					return <TodoItemComponent todo={todo} key={key} />
				})}
			</ul>
		);
	}
}