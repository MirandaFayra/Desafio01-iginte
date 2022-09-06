import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    //1. Criar uma condição para impidir que criamos uma nova tarefa caso não tenha 
    //titulo
    if(!newTaskTitle){
      return
    }
    
    //2. Criar uma nova tarefa, para quando a pessoa digitar
    const newTask={
      id: Math.floor(Math.random() * 65536),
      title: newTaskTitle,
      isComplete: false
    }

    // 3. Criar uma função para setar uma nova tarefa, onde as tareafs antigas 
    //passam a ser as novas tarefas
    setTasks((tasks)=>[...tasks,newTask])
    // 4. Voltar o input de tarefas para o estado inicial vazio
    setNewTaskTitle('')

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    //5.Mapear todas as tasks 
    const mappedTask = tasks.map(task => task.id === id ?{
      //6. Compara o id, se o id for igual edita ela => isComplete está no input checkbox
      ...task,
      isComplete:
    })

    
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    //7. Filtrar o estado com as tarefas e retornar todas as tasks que tem o id diferentes 
    const taskFiltered = tasks.filter(task => task.id !== id)

    //8. Estado retornado passa a ser a lista de tarfas filtradas
    setTasks(taskFiltered)

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}