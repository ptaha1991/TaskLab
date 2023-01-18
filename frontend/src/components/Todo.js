import React from 'react';

const TodoItem = ({item}) => {
    return (
    <tr>
        <td>
            {item.project.name}
        </td>
        <td>
            {item.text}
        </td>
        <td>
            {item.created_user}
        </td>
        <td>
            {item.active}
        </td>
    </tr>
    )
}

const TodoList = ({items}) => {
    return (
        <table>
            <th>
                Project name
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