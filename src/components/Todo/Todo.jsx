import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteTodo, fetchTodos, patchTodo } from "../../features/todosSlice";
import './todo.css'

const Todo = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);
  console.log(todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
     
  const hendleRemove = (id) => {
dispatch(deleteTodo(id))
  }

  const hendlePatch = (tofo) => {
    dispatch(patchTodo(tofo))
  }


  return (
    <>
      {loading ? (
        "Загрузка"
      ) : (
        <div>
          {todos.map((item) => {
            return (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  
                }}
              >
                <div className="todo_list">
                <input type="checkbox" checked={item.compleyted} onChange={() => hendlePatch(item)} />
                <div className={item.compleyted ? 'performed' : 'notDone'}>{item.todo}</div>
                <button onClick={() => hendleRemove(item._id)}>x</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Todo;
