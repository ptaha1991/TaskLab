import React from 'react';
import {Link} from 'react-router-dom'

const TodoItem = ({item, deleteTodo}) => {
    return (
    <tr>
        <td>
            {item.project}
        </td>
        <td>
            {item.text}
        </td>
        <td>
            {item.created_user}
        </td>
        <td>
            {item.active
            ? "yes"
            : "no" }
        </td>
        <td>
            <button onClick={()=>deleteTodo(item.id)} type='button'>Delete</button>
        </td>
    </tr>
    )
}

const TodoList = ({items, deleteTodo}) => {
    return (
        <div>
            <table>
                <th>
                    Project
                </th>
                <th>
                    Text
                </th>
                <th>
                    Created user
                </th>
                <th>
                    Active
                </th>
                <th>
                </th>
               {items.map((item) => <TodoItem item={item} deleteTodo={deleteTodo} />)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export default TodoList