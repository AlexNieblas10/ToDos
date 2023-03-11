import { useEffect } from "react";
import { useTodos } from "../hooks/Todos";

export function Main(props) {
	const storage = window.localStorage.data ? JSON.parse(window.localStorage.data) :[]
	const { arrayToDo, setArrayToDo } = props;
	const { hechas, setHechas, rmHechas } = useTodos({
		setArrayToDo,
		arrayToDo,
	});

	useEffect(() => {
		setArrayToDo(storage);
	}, []);

	return (
		<section className="mainContainer">
			{arrayToDo &&
				arrayToDo.map((item) => (
					<article key={item.id * Math.random()} className="toDo">
						<button
							onClick={() => {
								item.completed = !item.completed;
								setArrayToDo([...arrayToDo]);
								item.completed ? setHechas(true) : setHechas(false);
								window.localStorage.setItem("data", JSON.stringify(arrayToDo));
							}}
						>
							<i
								className={
									item.completed ? "fa-solid fa-x" : "fa-solid fa-check"
								}
							></i>
						</button>
						<h2
							style={
								item.completed === true
									? { color: "green", textDecoration: "line-through" }
									: { color: "" }
							}
						>
							{item.tarea}
						</h2>

						<button
							onClick={() => {
								const newArray = arrayToDo.filter(
									(itemToRemove) => itemToRemove.id != item.id
								);
								setArrayToDo(newArray);
								const arrayParaVerificar = newArray.map(
									(tarea) => tarea.completed
								);
								const verificar = arrayParaVerificar.toString().includes(true);
								verificar ? setHechas(true) : setHechas(false);
								window.localStorage.setItem(
									"data",
									JSON.stringify(arrayParaVerificar)
								);
							}}
						>
							<i className="fa-solid fa-trash"></i>
						</button>
					</article>
				))}
			{hechas && <button onClick={rmHechas}>Borrar las tareas hechas</button>}
		</section>
	);
}
