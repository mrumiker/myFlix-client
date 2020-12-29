import React from 'react';
import axios from 'axios';

import './main-view.scss';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'

class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null,
      userData: {}
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      const user = localStorage.getItem('user');
      this.setState({
        user
      });
      this.getMovies(accessToken);
      this.getUserInfo(user, accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://cbu-pix-flix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserInfo = (user, token) => {
    axios.get(`https://cbu-pix-flix.herokuapp.com/users/${user}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          userData: response.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  populateFavorites(movies, userData) {
    let favorites = [];

    for (let i = 0; i < userData.Favorites.length; i++) {
      for (let j = 0; j < movies.length; j++) {
        if (userData.Favorites[i] === movies[j]._id) {
          favorites.push(movies[j]);
        }
      }
    }
    return favorites;
  }

  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username);
    this.setState({
      userData: authData.user
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    console.log('onLoggedIn called')
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  render() {

    let { movies, user } = this.props;

    let { userData } = this.state;

    const logOutButton = !user ? '' :
      <Button className="logout-button" variant="warning" onClick={() => this.onLoggedOut()}>Logout</Button>;

    const profileLink = !user ? '' :
      <Link className="profile-link" to={'/profile'}>{user}</Link>

    const Navigation =
      <Navbar className="navigation-bar" fixed="top" bg="dark" variant="dark">
        <Navbar.Brand className="myflix-brand" href='/'>myFlix</Navbar.Brand>
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text >
            {profileLink}
          </Navbar.Text>
          <Navbar.Text>
            {logOutButton}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

    if (!movies) return <div className="main-view" />;

    return (

      <Router>
        <div className="main-view">

          {Navigation}

          <Container className="page-container" fluid>


            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

              return <MoviesList movies={movies} />;
            }
            } />

            <Route path="/register" render={() => <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />} />

            <Route path="/movies/:movieId" render={({ match }) =>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

            <Route path="/directors/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />
              return <DirectorView director={movies.find(m =>
                m.Director.Name === match.params.name).Director} films={(movies.filter(m => m.Director.Name === match.params.name))} />
            }} />

            <Route path="/genres/:name" render={({ match }) => {
              if (!movies) return <div className="main-view" />
              return <GenreView genre={movies.find(m =>
                m.Genre.Name === match.params.name).Genre} films={(movies.filter(m => m.Genre.Name === match.params.name))} />
            }} />

            <Route path="/profile" render={() => <ProfileView userData={userData} favorites={this.populateFavorites(movies, userData)} getUserInfo={this.getUserInfo} onLoggedOut={this.onLoggedOut} />} />

          </Container>
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);