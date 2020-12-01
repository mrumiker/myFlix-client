import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      registered: true
    };
  }

  componentDidMount() {
    axios.get('https://cbu-pix-flix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  toggleRegistered(registered) {
    this.setState({
      registered
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!registered) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} toggleRegistered={registered => this.toggleRegistered(registered)} />

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleRegistered={registered => this.toggleRegistered(registered)} />;

    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? <MovieView movie={selectedMovie} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
          ))
        }
      </div>
    );
  }
}

