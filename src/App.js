import { useEffect, useState } from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const[newTitle, setNewTitle] = useState('');
  const[newDescription, setNewDescription] = useState('');
  const[completedTodos, setCompletedTodos] = useState([]);
  const[currentEdit, setCurrentEdit] = useState("");
  const[currentEditedItem, setCurrentEditedItem] = useState("");

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
    setNewTitle('');
    setNewDescription('');
   
  }

  
 const handleDeleteTodo = (index) => {
    let deleteTodo = [...allTodos];
    deleteTodo.splice(index, 1);

    localStorage.setItem('todoList', JSON.stringify(deleteTodo));
    setAllTodos(deleteTodo);
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
      handleDeleteTodo(index);
      localStorage.setItem('completedTodos', JSON.stringify(updateCompleteArr));
    
  }
  const handleDeleteCompletedTodo = (index) =>{
    let deleteTodo = [...completedTodos];
    deleteTodo.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(deleteTodo));
    setCompletedTodos(deleteTodo);

  }
  const handleEditTodo = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  }
  const handleUpdateTitle = (value) => {
    setCurrentEditedItem( (prev) => {
      return{...prev, title: value}
    });

  }
  const handleUpdateDescription = (value) => {
    setCurrentEditedItem( (prev) => {
      return{...prev, description: value}
    });
  }
  const handleUpdateTodo = (index) => {
    let updateTodo = [...allTodos];
    updateTodo[index] = currentEditedItem;
    setAllTodos(updateTodo);
    setCurrentEdit("");
  }

  useEffect(() => {
    let savedTodo = localStorage.getItem('todoList');
    let savedCompletedTodo = localStorage.getItem('completedTodos');
    if (savedTodo) {
      setAllTodos(JSON.parse(savedTodo));
    }
    if (savedCompletedTodo) {
      setCompletedTodos(JSON.parse(savedCompletedTodo));
    } 

  }, [])
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
              {isCompleted === false && allTodos.map((item, index) => {
                if(currentEdit === index){
                  return(
                    <div className='edit_wrapper' key={index}>
                      <input type='text' value={currentEditedItem.title} onChange={(e) =>handleUpdateTitle(e.target.value)} />
                      <textarea placeholder='Updated description'
                        row={4}
                       value={currentEditedItem.description} 
                       onChange={(e) =>handleUpdateDescription(e.target.value)} />
                      <button className='primaryBtn' onClick={() => handleUpdateTodo(index)}>Update</button>
                    </div>
                  )
                }else{
                  return(
                    <div className='todo-list-item' key={index}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                      <div>
                        <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title='Delete' />
                        <BsCheckLg className='check-icon' onClick={() => handleCompletedTodo(index)} title='Completed'  />
                        <AiOutlineEdit className='check-icon' onClick={() => handleEditTodo(index,item)} title='Edit' />
                      </div>
                   </div>
                  )

                }
              })}
              {isCompleted === true && completedTodos.map((todo, index) => {
                return(
                    <div className='todo-list-item' key={index}>
                    <div>
                      <h3>{todo.title}</h3>
                      <p>{todo.description}</p>
                      <p><small>Completed on: {todo.time}</small></p>
                    </div>
                    <div>
                      <AiOutlineDelete className='icon' onClick={() => handleDeleteCompletedTodo(index)} title='Delete' />
                    </div>
                  </div>
                )
              })}
            </div>
        </div>
    </div>
    
  );
}

export default App;
