import React, {useState, useCallback} from 'react';
import InputCard from './components/InputCard';
import TodosCard from './components/TodosCard';
import Moon from './images/icon-moon.svg';
import Sun from './images/icon-sun.svg';
import DarkImage from './images/bg-desktop-dark.jpg';
import LightImage from './images/bg-desktop-light.jpg';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState('all');
  const [theme, setTheme] = useState('dark');

  let string = '';
  if (selectedChoice === 'all') {
    string = todos;
  }
  if (selectedChoice === 'completed') {
    string = completedTodos;
  }
  if (selectedChoice === 'active') {
    string = activeTodos;
  }
  const handleOnDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(string);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const checkboxClickHandler = id => {
    const newState = todos.map(todo => {
      if (todo.id === id) {
        return {...todo, completed: !todo.completed};
      }

      return todo;
    });

    setTodos(newState);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (!todo) {
      return;
    }

    setTodos([...todos, {todo: todo, completed: false, id: Math.random()}]);
    setTodo('');
  };

  const allHandler = () => {
    setSelectedChoice('all');
    const allTodos = [...todos];
    setTodos(allTodos);
  };

  const activeHandler = () => {
    setSelectedChoice('active');
    const filteredTodos = todos.filter(todo => {
      return todo.completed !== true;
    });
    setActiveTodos(filteredTodos);
  };
  const completedHandler = () => {
    setSelectedChoice('completed');
    const filteredTodos = todos.filter(todo => {
      return todo.completed === true;
    });
    setCompletedTodos(filteredTodos);
  };

  const clearCompletedHandler = () => {
    const filteredTodos = todos.filter(todo => {
      return todo.completed !== true;
    });
    setTodos(filteredTodos);
  };

  return (
    <div className='App'>
      {theme === 'dark' ? (
        <img
          src={DarkImage}
          className='background-img'
          alt='desktop-dark-img'
        />
      ) : (
        <img src={LightImage} className='background-img' />
      )}
      <div className='create-new'>
        <nav className='logo-dark'>
          <span>T O D O</span>
          {theme === 'light' ? (
            <img onClick={toggleTheme} src={Sun} alt='sun' />
          ) : (
            <img onClick={toggleTheme} src={Moon} alt='moon' />
          )}
        </nav>
        <form onSubmit={submitHandler}>
          <InputCard theme={theme}>
            <input
              onClick={submitHandler}
              className={
                theme === 'dark' ? 'checkbox create' : 'checkbox create light'
              }
              type='checkbox'
            />
            <input
              onChange={e => {
                setTodo(e.target.value);
              }}
              placeholder='Create a new todo...'
              className='input'
              type='text'
              value={todo}
            />
          </InputCard>
        </form>
      </div>
      <TodosCard theme={theme}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='asd'>
            {provided => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {string.map((todo, idx) => (
                  <Draggable
                    key={todo.id}
                    draggableId={todo.id.toString()}
                    index={idx}>
                    {provided => (
                      <li
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={theme === 'dark' ? 'label' : 'label light'}>
                        <input
                          defaultChecked={todo.completed}
                          type='checkbox'
                          value={todo.completed}
                          className={
                            theme === 'dark'
                              ? 'checkbox create'
                              : 'checkbox create light'
                          }
                          onClick={checkboxClickHandler.bind(null, todo.id)}
                          id={'`todo${idx}'}
                        />
                        <label
                          className={todo.completed ? 'completed-label' : ''}
                          htmlFor={`todo${idx}`}>
                          {todo.todo}
                        </label>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </TodosCard>
      {todos.length > 0 ? (
        <div className={theme === 'dark' ? 'select-menu' : 'select-menu light'}>
          <span style={{cursor: 'auto'}}>{string.length} items left</span>
          <div className='selects'>
            <span
              onClick={allHandler}
              className={selectedChoice === 'all' ? 'selected-item' : ''}>
              All
            </span>
            <span
              className={selectedChoice === 'active' ? 'selected-item' : ''}
              onClick={activeHandler}>
              Active
            </span>
            <span
              className={selectedChoice === 'completed' ? 'selected-item' : ''}
              onClick={completedHandler}>
              Completed
            </span>
          </div>
          <span onClick={clearCompletedHandler}>Clear Completed</span>
        </div>
      ) : (
        <h3
          style={{
            padding: '1rem',
            color: '#fff',
            fontWeight: 400,
            textAlign: 'center',
            background: 'gray',
            borderRadius: '10px',
          }}>
          There isn't anything to do,to add one write above !
        </h3>
      )}
      <span className='lastSpan'>Drag and drop is possible on all todos !</span>
    </div>
  );
}

export default App;
