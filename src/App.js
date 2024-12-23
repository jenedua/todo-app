import { use, useEffect, useState } from 'react';
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const[newTitle, setNewTitle] = useState('');
  const[newDescription, setNewDescription] = useState('');
  const[completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      isCompleted: false
    }
    let updatedTodoArr = [...allTodos]
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem('todoList', JSON.stringify(updatedTodoArr));
   
  }

  useEffect(() => {
    let todoList = localStorage.getItem('todoList');
    if (todoList) {
      setAllTodos(JSON.parse(todoList));
    }
  }, [])
 const handleDeleteTodo = (index) => {
    let deleteTodo = [...allTodos];
    deleteTodo.splice(index, 1);
    setAllTodos(deleteTodo);
    localStorage.setItem('todoList', JSON.stringify(deleteTodo));
  }
  const handleCompletedTodo = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let time = `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;
   
      let filteredItem ={
        ...allTodos[index],
        time: time,
      }
      let updateCompleteArr = [...completedTodos];
      updateCompleteArr.push(filteredItem);
      setCompletedTodos(updateCompleteArr);
    
  }
  return (
    <div className='App'>
        <h1>My Todos</h1>
        <div className='todo-wrapper'>
            <div className='todo-input'>
              <div className='todo-input-item'>
                <label>Title</label>
                <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='Enter the title' />
              </div>
              <div className='todo-input-item'>
                <label>Description</label>
                <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder='Enter the description' />
              </div>
              <div className='todo-input-item'>
                <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
              </div>
            </div>
            <div className='btn-area'>
              <button className={`secundaryBtn ${isCompleted === false && 'active'}`} onClick={() => setIsCompleted(false)}>Todo</button>
              <button className={`secundaryBtn ${isCompleted === true && 'active'}`} onClick={() => setIsCompleted(true)}>Completed</button>
            </div>
            <div className='todo-list'>
              {isCompleted === false && allTodos.map((todo, index) => (
                <div className='todo-list-item' key={index}>
                  <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title='Delete' />
                    <BsCheckLg className='check-icon' onClick={() => handleCompletedTodo(index)} title='Completed'  />
                  </div>
                </div>
              ))}
              {isCompleted === true && completedTodos.map((todo, index) => (
                <div className='todo-list-item' key={index}>
                  <div>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <p><small>Completed on: {todo.time}</small></p>
                  </div>
                  <div>
                    <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title='Delete' />
                  </div>
                </div>
              ))}
            </div>
        </div>
    </div>
    
  );
}

export default App;
