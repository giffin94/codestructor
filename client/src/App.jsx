import React, {Component} from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';

import CoursesNew     from  './Pages/Courses/Create.jsx'
import CoursesIndex   from  './Pages/Courses/Index.jsx';
import CoursesShow    from  './Pages/Courses/Show.jsx';
import CoursesUpdate  from  './Pages/Courses/Update.jsx'
import ProblemsNew    from  './Pages/Problems/Create.jsx';
import ProblemsShow   from  './Pages/Problems/Show.jsx';
import ProblemsUpdate from  './Pages/Problems/Update.jsx';

const defaultUserID = 2;
axios.defaults.headers.common['UserID'] = defaultUserID;

// import route Components here
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

const Home = () => (
  <React.Fragment>
  <section className="homePage">
    <div className="content">
      <div class="title">
        <h2> Welcome to Codestructor </h2>
      </div>
      <div class="continue">
        <Link to="/courses" style={{ color: '#0C8D30', textDecoration: 'none' }}>
          <i className="fas fa-play-circle button"></i>
          <div className="text">
            Continue your journey
          </div>
        </Link>
      </div>
      <div class="pitch">
        <p>
          Codestructor is tool that allows educators to create content for students to engage with computational thinking without needing to know how to code. Students are able to solve algorithm based problems using drag and drop blocks, placing greater emphasis on problem solving ability as opposed to language fluency. Educators can easily construct courses and problems for students to enroll in and test their abilities.
        </p>
      </div>
    </div>
  </section>
  </React.Fragment>
);

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  
  constructor(props) {
    super(props);
    const { cookies } = props;
    cookies.set('id', defaultUserID);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/admin/v1/users/${this.props.cookies.get('id')}.json`)
    .then(response => {
      this.setState({ user: response.data });
    })
    .catch(error => console.log(error))
  } 

  render() {
    return (
      <React.Fragment>
        <div className="navbar">
          
          <span className="link">
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              🅲🅾🅳🅴🆂🆃🆁🆄🅲🆃🅾🆁
            </Link>
          </span>
          
          <span className="session">
            Sign Out
          </span>
        </div>
        
        {/* <button className='devHelper' onClick={ () => { 
            this.props.cookies.set('id', this.state.user.id === 2 ? 3 : 2);
            axios.defaults.headers.common['UserID'] = this.props.cookies.get('id'); // for all requests
            this.componentDidMount();
            }
          }> Logged in as: {(this.state.user.teacher ? 'Teacher' : 'Student')} 
        </button> */}

        {/* All of our routes are defined here */}
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/courses" exact render={(props) => <CoursesIndex {...props} teacher={this.state.user.teacher} /> } />
          <Route path="/courses/new" exact render={ (props) => <CoursesNew {...props} teacher={this.state.user.teacher} /> } />
          <Route path="/courses/:id" exact render={ (props) => <CoursesShow {...props} teacher={this.state.user.teacher} /> } /> 
          <Route path="/courses/:id/edit" exact render={ (props) => <CoursesUpdate {...props} teacher={this.state.user.teacher} /> } />
          <Route path="/courses/:id/problems/new" exact render={ (props) => <ProblemsNew {...props} teacher={this.state.user.teacher} /> } /> 
          <Route path="/courses/:id/problems/:id" exact render={ (props) => <ProblemsShow {...props} teacher={this.state.user.teacher} /> } />
          <Route path="/courses/:id/problems/:id/edit" exact render={ (props) => <ProblemsUpdate {...props} teacher={this.state.user.teacher} /> } />
          <Route render={() => {return <h1>You just 404'd</h1>}} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default withCookies(App);
