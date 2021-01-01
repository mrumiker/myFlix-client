import React from 'react';
import axios from 'axios';
import Config from '../../config';

import './main-view.scss';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { setMovies, setUser, setFaves } from '../../actions/actions';

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

    this.state = {};
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      const user = localStorage.getItem('user');
      this.props.setUser(user);
      this.getMovies(accessToken);
      this.getUserInfo(user, accessToken);
    }
  }

  getMovies(token) {
    axios.get(`${Config.API_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(err => console.log(err));
  }

  getUserInfo = (user, token) => {
    axios.get(`${Config.API_URL}/users/${user}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setFaves(response.data.Favorites)
      })
      .catch(err => console.log(err));
  }

  populateFavorites(movies, faves) {
    console.time();
    let favorites = movies.filter(m => faves.includes(m._id));
    console.timeEnd();
    console.log(favorites);

    console.time();
    favorites = [];
    for (let i = 0; i < faves.length; i++) {
      for (let j = 0; j < movies.length; j++) {
        if (faves[i] === movies[j]._id) {
          favorites.push(movies[j]);
          break;
        }
      }
    }
    console.timeEnd();
    return favorites;
  }

  onLoggedIn(username, token, faves) {
    this.props.setUser(username);
    localStorage.setItem('token', token);
    localStorage.setItem('user', username);
    this.props.setFaves(faves);
    this.getMovies(token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self'); //Check out history in React Router
  }

  render() {

    let { movies, user, favorites } = this.props;

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
              if (!user) return <LoginView onLoggedIn={(u, t, f) => this.onLoggedIn(u, t, f)} />;

              return <MoviesList movies={movies} />;
            }
            } />

            <Route path="/register" render={() => <RegistrationView onLoggedIn={(u, t, f) => this.onLoggedIn(u, t, f)} />} />

            <Route path="/movies/:movieId" render={({ match }) =>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} favorites={favorites} getUserInfo={this.getUserInfo} />} />

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

            <Route path="/profile" render={() => <ProfileView favorites={this.populateFavorites(movies, favorites)} getUserInfo={this.getUserInfo} onLoggedOut={this.onLoggedOut} />} />

          </Container>
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user, favorites: state.favorites }
}

export default connect(mapStateToProps, { setMovies, setUser, setFaves })(MainView);