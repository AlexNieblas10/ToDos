import { useId } from "react";
import "../css/header.css";

export function Header(props) {
	const formData = useId();

	const { todo, setTodo, arrayToDo, setArrayToDo } = props;

	const handleChange = (e) => {
		setTodo(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		e.target[0].value = "";
		validarData();
	};

	const validarData = () => {
		if (todo === "") {
			alert("Ingrese algo");
			return;
		}
		const data = {
			tarea: todo,
			completed: false,
			id: Math.round(arrayToDo.length * Math.random() * 100),
		};
		const res = [...arrayToDo, data];
		setArrayToDo(res);
		window.localStorage.setItem('data', JSON.stringify(res))
	};

	return (
		<section className="mainContainerHeader">
			<section className="title">
				<h1>To-Do App</h1>
			</section>

			<form onSubmit={handleSubmit} className="form">
				<label htmlFor={formData}>¿Cuál es tu "To do"?</label>
				<input
					onChange={handleChange}
					type="text"
					placeholder="Lavar trastes, Hacer comida..."
				/>
				<div className="containerBoton">
					<button className="boton">Añadir</button>
				</div>
			</form>
		</section>
	);
}
