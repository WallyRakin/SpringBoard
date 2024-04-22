// Todo.js
import React from 'react';

export function Todo({ id, task, removeTodo }) {
    return (
        <div>
            {task}
            <button onClick={() => removeTodo(id)}>X</button>
        </div>
    );
};