import React from 'react';

const TodoItem = ({item}) => {
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
    </tr>
    )
}

const TodoList = ({items}) => {
    return (
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
           {items.map((item) => <TodoItem item={item} />)}
        </table>
    )
}

export default TodoList