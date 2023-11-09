import { useState, useEffect } from "react";
import { Todo } from "../page";

type Props = {
	data: Todo[]
}
export default function Dashboard({ data }: Props) {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);

	useEffect(() => {
		setTodos(data);
	}, [data]);

	useEffect(() => {
		const totalHours = todos.reduce(
			(sum, cur) => sum + cur.time, 0
		);
		setHours(totalHours);
		setDays(Math.round(totalHours / 8 * 100) / 100);
	}, [todos]);

	return (
		<div className="w-fit flex mb-16">
			<div className="text-center mr-16 border-2 border-gray-300 px-8 py-4">
				<label className="block">Total Tasks</label>
				<span><b> {todos.length} </b></span>
			</div>
			<div className="text-center mr-16 border-2 border-gray-300 px-8 py-4">
				<label className="block" htmlFor="">Total Days</label>
				<span><b>{days}</b></span>
			</div>
			<div className="text-center  border-2 border-gray-300 px-8 py-4">
				<label className="block" htmlFor="">Total Hours</label>
				<span><b>{hours}</b></span>
			</div>
		</div>
	)
}