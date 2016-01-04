import Dispatcher from "../dispatcher/AppDispatcher";
import TodosConstants from "../constants/TodosConstants";
import {ITodo} from "../stores/TodoStore";

export default class TodoAction {

	static getAll() {
		Dispatcher.dispatch({
			actionType: TodosConstants.GET_ALL
		});
	}

	static create(text: string) {
		Dispatcher.dispatch({
			actionType: TodosConstants.CREATE,
			text: text
		});
	}

	static toggleCompleted(todo: ITodo) {
		Dispatcher.dispatch({
			actionType: TodosConstants.TOGGLE_COMPLETED,
			todo: todo
		});
	}
}