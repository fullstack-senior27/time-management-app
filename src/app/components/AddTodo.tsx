"use client";
import { useState, useEffect, MouseEvent } from "react";
import { Todo } from "../page";
import ErrorModal from "./ErrorModal";

type Props = {
	onAddTodo: (newTodo: Todo) => void;
}

export default function AddTodo({ onAddTodo }: Props) {
	const [todo, setTodo] = useState<Todo>({
		title: "",
		time: 0,
	});

	const [showError, setShowError] = useState(false);
	const [message, setMessage] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setTodo({ ...todo, [name]: value });
	};

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		let { title, time } = todo;
		time = Number(time);

		if (title == "" || time <= 0) {
			setMessage("Title and time should not be empty");
			setShowError(true);
			return;
		}

		if (title.length > 128) {
			setMessage("Title length should not exceed 128 characters.");
			setShowError(true);
			return;
		}

		if (time <= 0 || time >= 24) {
			setMessage("Time should be between 0-24.");
			setShowError(true);
			return;
		}

		const newTodo = {
			title: title,
			time: time,
		};

		onAddTodo(newTodo);

		setTodo({
			title: "",
			time: 0,
		});
	};

	return (
		<div className="w-fit flex mb-16">
			{
				showError ? <ErrorModal message={message} onOk={() => { setShowError(false); }} />
					: null
			}
			<div className="mr-8">
				<label className="block" htmlFor="title">Task Title</label>
				<input className="outline-none border-2 border-gray-300 focus:border-[#6558F5] px-2 py-1" type="text" name="title" id="title" value={todo.title} onChange={handleChange} />
			</div>
			<div className="mr-8">
				<label className="block" htmlFor="time">Time Required(in Hrs)</label>
				<input className="outline-none border-2 border-gray-300 focus:border-[#6558F5] px-2 py-1" type="number" name="time" id="time" value={todo.time} onChange={handleChange} />
			</div>
			<div className="relative">
				<button className="absolute bottom-0 bg-sky-500 px-2 py-1 text-white rounded" onClick={handleClick}>Add</button>
			</div>
		</div>
	)
}