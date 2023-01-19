import React from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserList from './components/User.js';
import TodoList from './components/Todo.js';
import ProjectList from './components/Project.js';
import ProjectTodoList from './components/ProjectTodo.js';
import Footer from './components/Footer.js';
import Menu from './components/Menu.js';
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'

const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
   constructor(props) {
       super(props)
//       const user1 = {
//                first_name: 'Фёдор',
//                last_name: 'Достоевский',
//                email: 1821
//            }
//       const user2 = {
//                first_name: 'Фёдоeewр',
//                last_name: 'Достоjk',
//                email: 18219
//            }
//       const users = [user1, user2]
//       const project1 = {
//                id: 1,
//                name: 'proj',
//                link: 'Достоевский',
//                users: 1
//            }
//       const project2 = {
//                id: 2,
//                name: 'proj2',
//                link: 'Достоевский',
//                users: 2
//            }
//       const projects = [project1, project2]
//       const todo1 = {
//                project: project1,
//                text: 'Достоевский',
//                created_user: 1821,
//                active: 1
//            }
//       const todo2 = {
//                project: project2,
//                text: 'Достоевский',
//                created_user: 1821,
//                active: 1
//            }
//       const todos = [todo1, todo2]
       this.state = {
           'users': [],
           'projects': [],
           'todos': []
       }
   }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users
                    }
                    )
            }).catch(error => console.log(error));
        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data
                    this.setState(
                    {
                        'projects': projects
                    }
                    )
            }).catch(error => console.log(error));
        axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                const todos = response.data
                    this.setState(
                    {
                        'todos': todos
                    }
                    )
            }).catch(error => console.log(error))
    }

   render () {
       return (
            <div className="App">
                <BrowserRouter>
                    <Menu />
                    <Switch>
                        <Route exact path='/' component={() => <ProjectList items={this.state.projects} />} />
                        <Route exact path='/todos' component={() => <TodoList items={this.state.todos} />} />
                        <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
                        <Route  path='/project/:id' component={() => <ProjectTodoList items={this.state.todos} />} />
                        <Redirect from='/projects' to='/' />
                        <Route component={NotFound404} />
                    </Switch>
                </BrowserRouter>
                <Footer />
             </div>
       )
    }

}
export default App;

