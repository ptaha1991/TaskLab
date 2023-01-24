import React from 'react';
import {Link} from 'react-router-dom'

const ProjectItem = ({item}) => {
    return (
    <tr>
        <td>
            <Link to={`project/${item.id}`}>{item.id}</Link>
        </td>
        <td>
            {item.name}
        </td>
        <td>
            {item.link}
        </td>
        <td>
            {item.users}
        </td>
    </tr>
    )
}

const ProjectList = ({items}) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                Name
            </th>
            <th>
                Link
            </th>
            <th>
                Users
            </th>
           {items.map((item) => <ProjectItem item={item} />)}
        </table>
    )
}

export default ProjectList