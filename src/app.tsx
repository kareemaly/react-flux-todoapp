import * as React from "react";
import * as ReactDOM from "react-dom";
import AppComponent from "./components/AppComponent";
import {todoStore} from "./stores/TodoStore";

// Register Action Handler to activate this store
todoStore.registerActionHandler();

// Now whenever an action is called the todostore will be listening 

ReactDOM.render(
	<AppComponent />,
	document.getElementById("todoApp")
)