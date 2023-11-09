"use client";
import {useEffect, useState} from "react";
import TodoList from './components/TodoList'
import Dashboard from './components/Dashboard';
import AddTodo from './components/AddTodo';

export interface Todo {
  title: string,
  time: number,
};

export default function Home() {
  const [data, setData] = useState<Todo[]>([]);
  useEffect(() => {
    if (!localStorage.getItem("workData")) {
      localStorage.setItem("workData", JSON.stringify([
        {
          title: "Task-1",
          time: 8,
        }, {
          title: "Task-2",
          time: 24,
        }, {
          title: "Task-3",
          time: 16,
        }, {
          title: "Task-4",
          time: 8,
        }, {
          title: "Task-5",
          time: 16,
        }
      ]));
    }
    const workData: Todo[] = JSON.parse(localStorage.getItem("workData") || "");
    setData(workData);
  }, []);
  
  const onAddTodo = (newTodo: Todo) => {
    const newData = [...data, newTodo];
    setData(newData);
    localStorage.setItem("workData", JSON.stringify(newData));
  }

  const onDeleteTodo = (deleteIndex: number) => {
    const newData = data.filter((todo: Todo, todoIdx: number) => {
      return todoIdx !== deleteIndex;
    });
    setData(newData);
    localStorage.setItem("workData", JSON.stringify(newData));
  }

  return (
    <div className="w-fit m-8 p-4 border-2 border-gray-300">
      <h2 className="font-bold">Task Management App</h2>
      <Dashboard data={data} />
      <AddTodo onAddTodo={onAddTodo}/>
      <TodoList data={data} onDeleteTodo={onDeleteTodo}/>
    </div>
  )
}
