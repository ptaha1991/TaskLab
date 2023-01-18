import React from 'react';
import { useParams } from 'react-router-dom'

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
    </tr>
    )
}

const ProjectTodoList = ({items}) => {
    let { id } = useParams();
    let filtered_items = items.filter((item) => item.project == id)
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
           {filtered_items.map((item) => <TodoItem item={item} />)}
        </table>
    )
}

export default ProjectTodoList