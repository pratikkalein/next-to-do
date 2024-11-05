
type Todo = {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
  }
  
  const todos: { [user: string]: Todo[] } = {};
  
  export const getTodos = (user: string) => todos[user] || [];
  
  export const addTodo = (user: string, todo: Todo) => {
    if (!todos[user]) todos[user] = [];
    todos[user].push(todo);
  };
  
  export const updateTodo = (user: string, id: number, updatedTodo: Partial<Todo>) => {
    const userTodos = todos[user];
    const todoIndex = userTodos.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
      userTodos[todoIndex] = { ...userTodos[todoIndex], ...updatedTodo };
    }
  };
  
  export const deleteTodo = (user: string, id: number) => {
    todos[user] = todos[user].filter((todo) => todo.id !== id);
  };
  