import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true,
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
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserInfo(user, token) {
    {/*Pass this data as a Prop to Profile View*/ }
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

  updateUserInfo = userData => {
    this.setState({ userData });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegistered(authData) {
    console.log(authData);
    this.setState({
      user: authData.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  toggleRegistered(registered) {
    this.setState({
      registered
    });
  }



  render() {
    const { movies, user, userData } = this.state;

    const logOutButton = !user ? '' :
      <Button className="logout-button" variant="warning" onClick={() => this.onLoggedOut()}>Logout</Button>;
    const homeLink = !user ? '' : <Link to={'/'}>Home</Link>;
    const profileLink = !user ? '' : <Link to={'/profile'}>{user}</Link>

    if (!movies) return <div className="main-view" />;

    return (

      <Router>
        <div className="main-view">
          <h1>MyFlix</h1>{homeLink} {profileLink}

          <Container fluid>
            <Row>

              <Route exact path="/" render={() => {
                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

                return movies.map(m => (
                  <Col key={m._id} xs={12} sm={6} md={4} lg={3}>
                    <MovieCard key={m._id} movie={m} />
                  </Col>

                ))
              }
              } />

              <Route path="/register" render={() => <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />} />

              <Route exact path="/movies/:movieId" render={({ match }) =>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

              <Route exact path="/directors/:name" render={({ match }) => {
                if (!movies) return <div className="main-view" />
                return <DirectorView director={movies.find(m =>
                  m.Director.Name === match.params.name).Director} films={(movies.filter(m => m.Director.Name === match.params.name)).map(film => film.Title)} />
              }} />

              <Route exact path="/genres/:name" render={({ match }) => {
                if (!movies) return <div className="main-view" />
                return <GenreView genre={movies.find(m =>
                  m.Genre.Name === match.params.name).Genre} films={(movies.filter(m => m.Genre.Name === match.params.name)).map(film => film.Title)} />
              }} />

              <Route exact path="/profile" render={() => <ProfileView user={userData} updateUserInfo={this.updateUserInfo} onLoggedOut={this.onLoggedOut} />} />
            </Row>

            {logOutButton}

          </Container>
        </div>
      </Router>
    );
  }
}

