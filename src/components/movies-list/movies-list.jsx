import React from 'react';
import { connect } from 'react-redux';

import './movies-list.scss';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />

  return <div className="movies-list">
    <VisibilityFilterInput className="filter-input" visibilityFilter={visibilityFilter} />
    <br />
    <Row className="movies-container">
      {filteredMovies.map(m =>
        <Col key={m._id} xs={12} sm={6} md={4} lg={3}>
          <MovieCard key={m._id} movie={m} />
        </Col>
      )}
    </Row>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);