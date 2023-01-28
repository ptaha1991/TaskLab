import React from 'react';

import './style.css';
import {Link} from 'react-router-dom'


function Menu (props) {

    return (
          <nav>
            <ul>
                <li>
                    <Link to='/projects'>Projects</Link>
                </li>
                <li>
                    <Link to='/users'>Users</Link>
                </li>
                <li>
                    <Link to='/todos'>Todos</Link>
                </li>
                <li>
                    {props.logout}
                </li>
            </ul>
          </nav>

    )
}

export default Menu