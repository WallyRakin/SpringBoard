// NewTodoForm.js
import React, { useState } from 'react';


export function NewTodoForm({ addTodo }) {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ task });
        setTask('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a new task"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};