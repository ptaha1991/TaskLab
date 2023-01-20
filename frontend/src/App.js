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
       this.state = {
           'users': [],
           'projects': [],
           'todos': []
       }
   }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                    this.setState(
                    {
                        'users': users
                    }
                    )
            }).catch(error => console.log(error));
        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data.results
                    this.setState(
                    {
                        'projects': projects
                    }
                    )
            }).catch(error => console.log(error));
        axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                const todos = response.data.results
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

