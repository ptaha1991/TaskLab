import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserList from './components/User.js';
import Footer from './components/Footer.js';
import Menu from './components/Menu.js';

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': []
       }
   }

//   componentDidMount() {
//        const users = [
//            {
//                'first_name': 'Фёдор',
//                'last_name': 'Достоевский',
//                'birthday_year': 1821
//            },
//            {   'first_name': 'Александр',
//                'last_name': 'Грин',
//                'birthday_year': 1880
//            },
//        ]
//       this.setState(
//           {
//               'users': users
//           }
//       )
//   }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users
                    }
                    )
            }).catch(error => console.log(error))
    }

   render () {
       return (
          <div>
            <Menu />
            <br />
            <br />
            <UserList users={this.state.users} />
            <Footer />
          </div>


       )
    }
}
export default App;
