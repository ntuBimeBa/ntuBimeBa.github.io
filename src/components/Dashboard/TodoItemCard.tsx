const TodoItemCard = ({ todo }) => (
  <div className="border rounded p-4 cursor-pointer hover:bg-accent" onClick={() => runTodoScript(todo)}>
    <div className="font-semibold">{todo.title}</div>
    <div className="text-sm text-muted-foreground text-right">{todo.due}</div>
  </div>
);

const runTodoScript = (todo) => {
  // trigger custom action
  alert(`執行任務：${todo.title}`);
};

export default TodoItemCard;
