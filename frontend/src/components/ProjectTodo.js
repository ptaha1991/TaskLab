import React from 'react';
import { useParams } from 'react-router-dom'

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

const ProjectTodoList = ({items}) => {
    let { id } = useParams();
    let filtered_items = items.filter((item) => item.project.id == id)
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
           {filtered_items.map((item) => <TodoItem item={item} />)}
        </table>
    )
}

export default ProjectTodoList