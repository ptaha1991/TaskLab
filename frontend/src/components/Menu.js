import React from 'react';

import './style.css';
import {Link} from 'react-router-dom'

function Menu () {
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
            </ul>
          </nav>

    )
}

export default Menu