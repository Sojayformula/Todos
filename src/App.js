import React, {useState, useEffect} from 'react'
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';


function App() {
  const[isCompletedScreen, setIsCompletedScreen] = useState(false)
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([])

  const handleAddTodo = () => {
    let newTodoItem = {
      title:newTitle,
      Description:newDescription
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo = index => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem ('todolist', JSON.stringify (reducedTodo));
    setAllTodos (reducedTodo);
  };

  const handleComplete = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yyyy + "at" + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify( updatedCompletedArr));

  }

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index);

    localStorage.setItem ('completedTodos', JSON.stringify (reducedTodo));
    setCompletedTodos (reducedTodo);
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
    setAllTodos(savedTodo);
    }

    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
  }
  },[])
  return (
    <div className="App">
      <h1>My Todos</h1>j

      <div className='todo-wrapper'>
      <div className='todo-input'>
        <div className='todo-input-item'>
          <label>Title</label>
          <input 
          type="text"
          placeholder="what is the task title?"
          value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}
          />
        </div>

        <div className='todo-input-item'>
          <label>Description</label>
          <input 
          type="text"
          placeholder="what is the task Description ?"
          value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}
          />
        </div>

        <div className='todo-input-item'>
          <button type="button" className='primaryBtn' 
          onClick={handleAddTodo}
          >
            Add
            </button>
        </div>
      </div>
     
      <div className='btn-area'>
        <button className={`secondaryBtn ${isCompletedScreen===false && 'active'}`} onClick={()=>{setIsCompletedScreen(false)}}>Todo</button>
        <button className={`secondaryBtn ${isCompletedScreen===true && 'active'}`} onClick={()=>{setIsCompletedScreen(true)}}>Completed</button>
      </div>

      <div className='todo-list'>

        {isCompletedScreen == false && allTodos.map((item, index) => {
          return(
              <div className='todo-list-item' key={index}>
        <div>
        <h3 className=''>{item.title}</h3>
        <p>{item.Description}</p>
      </div>

       <div className='icon-container'>
        <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)}/>
        <BsCheckLg className='check-icon' onClick={() => handleComplete(index)}/>
      </div> 
      </div> 
          )
        }
      )}

        {isCompletedScreen == true && completedTodos.map((item, index) => {
          return(
              <div className='todo-list-item' key={index}>
        <div>
        <h3 className=''>{item.title}</h3>
        <p>{item.Description}</p>
        <p><small>Completed on: {item.completedOn}</small></p>
      </div>

       <div className='icon-container'>
        <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)}
        title = "Delete?"
          />
        {/* <BsCheckLg className='check-icon' onClick={() => handleComplete(index)}/> */}
      </div> 
      </div> 
          )
        }
      )}
     

      </div>
    </div>
    </div>
  );
}

export default App;
