import { useState } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import "./css/main.css";

export function App() {
	const [todo, setTodo] = useState("");
	const [arrayToDo, setArrayToDo] = useState([]);

	return (
		<>
			<Header arrayToDo={arrayToDo} setArrayToDo={setArrayToDo} todo={todo} setTodo={setTodo} />
			<Main arrayToDo={arrayToDo} setArrayToDo={setArrayToDo}/>
		</>
	);
}
