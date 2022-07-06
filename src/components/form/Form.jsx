import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostTodo, fetchTodos } from "../../features/todosSlice";
import './form.css'

const Form = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const todos = useSelector((state) => state);
  const loading = useSelector((state) => state.loading);
  
  
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleTextValue = (e) => {
    setText(e.target.value);
  };

  const handlePost = (text) => {
    dispatch(fetchPostTodo(text));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setText("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input className='value' type="text" value={text} onChange={handleTextValue} placeholder='Type your task' />
      <button className={!text ? "button_does_not_work" : "button_works"} onClick={() => handlePost(text) } disabled={!text}>send</button>
      {!text && <div>
        <p className="error_input">Поля вода не должно быть пустым</p>
      </div>}
    </form>
  );
};

export default Form;
