import { useEffect } from "react"
import { useTodos } from "../hooks/Todos"
import check from "../assets/check.svg"
import close from "../assets/close.svg"
import trash from "../assets/trash.svg"

export function Main(props) {
	const storage = window.localStorage.data
		? JSON.parse(window.localStorage.data)
		: []
	const { arrayToDo, setArrayToDo } = props
	const { hechas, setHechas, rmHechas } = useTodos({
		setArrayToDo,
		arrayToDo,
	})

	useEffect(() => {
		setArrayToDo(storage)
	}, [])

	return (
		<section className="mainContainer">
			{arrayToDo &&
				arrayToDo.map((item) => (
					<article key={item.id * Math.random()} className="toDo">
						<button
							onClick={() => {
								item.completed = !item.completed
								setArrayToDo([...arrayToDo])
								item.completed ? setHechas(true) : setHechas(false)
								window.localStorage.setItem("data", JSON.stringify(arrayToDo))
							}}
						>
							<img src={item.completed ? close : check} alt="✓" />
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
								)
								setArrayToDo(newArray)
								const arrayParaVerificar = newArray.map(
									(tarea) => tarea.completed
								)
								const verificar = arrayParaVerificar.toString().includes(true)
								verificar ? setHechas(true) : setHechas(false)
								window.localStorage.setItem(
									"data",
									JSON.stringify(arrayParaVerificar)
								)
							}}
						>
							<img src={trash} alt="" />
						</button>
					</article>
				))}
			{hechas && <button onClick={rmHechas}>Borrar las tareas hechas</button>}
		</section>
	)
}
