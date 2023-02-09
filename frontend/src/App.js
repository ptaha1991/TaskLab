import React from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserList from './components/User.js';
import TodoList from './components/Todo.js';
import TodoForm from './components/TodoForm.js';
import ProjectList from './components/Project.js';
import ProjectForm from './components/ProjectForm.js';
import ProjectTodoList from './components/ProjectTodo.js';
import Footer from './components/Footer.js';
import Menu from './components/Menu.js';
import {Route, Switch, Redirect, BrowserRouter, Link} from 'react-router-dom'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';

const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'username': ''
        }
    }

    set_token_username(token, username) {
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('username', username)
        this.setState({
            'token': token,
            'username': username
        }, ()=>this.load_data())
   }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token_username('', '')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const username = cookies.get('username')
        this.setState({
            'token': token,
            'username': username
        },  ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token_username(response.data['token'], username)
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
            {
                headers['Authorization'] = 'Token ' + this.state.token
            }
        return headers
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                this.setState({
                    todos: this.state.todos
                },  ()=>this.load_data())
        })
    }
//            .then(response => {
//                this.setState({todos: this.state.todos.filter((item)=>item.id !==id)})
//            }).catch(error => console.log(error))

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item)=>item.id !==id)})
                    }).catch(error => console.log(error))
    }

    createTodo(project, text, created_user) {
        const headers = this.get_headers()
        const data = {project: project, text: text, created_user: created_user}
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
            .then(response => {
                let new_todo = response.data
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
    }

    createProject(name, link, users) {
        const headers = this.get_headers()
        const data = {name: name, link: link, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                let new_project = response.data
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data.results
                    this.setState(
                    {
                        'users': users
                    }
                    )
            }).catch(error => {
                console.log(error)
                this.setState({users: []})
                })
        axios.get('http://127.0.0.1:8000/api/projects', {headers})
            .then(response => {
                const projects = response.data.results
                    this.setState(
                    {
                        'projects': projects
                    }
                    )
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
                })
        axios.get('http://127.0.0.1:8000/api/todos', {headers})
            .then(response => {
                const todos = response.data.results
                    this.setState(
                    {
                        'todos': todos
                    }
                    )
            }).catch(error => {
                console.log(error)
                this.setState({todos: []})
                })
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

   render () {
       return (
            <div className="App">
                <BrowserRouter>
                    <Menu
                        logout= {this.is_authenticated()
                            ? <button onClick={()=>this.logout()}>{this.state.username} Logout </button>
                            : <Link to='/login'>Login</Link>}
                    />
                    <Switch>
                        <Route exact path='/' component={() => <ProjectList items={this.state.projects}
                            deleteProject={(id)=>this.deleteProject(id)}/>} />
                        <Route exact path='/projects/create' component={() => <ProjectForm
                            users={this.state.users} createProject={(name, link) => this.createProject(name, link)}/>} />
                        <Route exact path='/todos' component={() => <TodoList items={this.state.todos}
                            deleteTodo={(id)=>this.deleteTodo(id)}/>} />
                        <Route exact path='/todos/create' component={() =>
                            <TodoForm projects={this.state.projects} created_users={this.state.users}
                            createTodo={(project, text, created_user) =>
                            this.createTodo(project, text, created_user)} />} />
                        <Route exact path='/users' component={() => <UserList users={this.state.users} />} />
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) =>
                            this.get_token(username, password)} />} />
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

