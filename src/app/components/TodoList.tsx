"use client";
import { useState, useEffect } from "react";
import { Todo } from "../page";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

type Props = {
	data: Todo[]
	onDeleteTodo: (index: number) => void
}

export default function TodoList({ data, onDeleteTodo }: Props) {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		setTodos(data);
	}, [data])

	return (
		<div className="w-fit">
			<h2 className="font-bold">Todo list</h2>

			{
				showModal ?
					<ConfirmDeleteDialog onOk={() => { onDeleteTodo(currentIndex); setShowModal(false); }}
						onCancel={() => { setShowModal(false); }}
					/>
					: null
			}


			<table className="border-2 border-gray-300">
				<thead>
					<tr>
						<th className="w-96 border-2 border-gray-300 text-left px-2 py-1">Task Title</th>
						<th className="w-64 border-2 border-gray-300 text-left px-2 py-1">Time Required(in Hrs)</th>
						<th className="w-20 border-2 border-gray-300 text-left px-2 py-1">Action</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo, index) => (
						<tr key={index}>
							<td className="border-2 border-gray-300 px-2 py-1">{todo.title}</td>
							<td className="border-2 border-gray-300 px-2 py-1">{todo.time}</td>
							<td className="border-2 border-gray-300 px-2 py-1">
								<button className="text-red-500 underline decoration-red-300" onClick={() => { setCurrentIndex(index); setShowModal(true) }}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}