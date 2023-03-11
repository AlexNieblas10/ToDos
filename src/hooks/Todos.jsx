import { useState } from "react";

export function useTodos(props) {
	const storage = JSON.parse(window.localStorage.data);

	const [hechas, setHechas] = useState(false);

  const setArrayToDo = props.setArrayToDo
  const arrayToDo = props.arrayToDo

	function rmHechas() {
		const tareasPorHacer = arrayToDo.filter((item) => !item.completed);
		setArrayToDo(tareasPorHacer);
		setHechas(false);
		window.localStorage.setItem("data", JSON.stringify(tareasPorHacer));
	}

	return { hechas, setHechas,  storage, rmHechas };
}
