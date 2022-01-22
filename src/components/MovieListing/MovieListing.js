import MovieCard from 'components/MovieCard/MovieCard'
import { getAllMovies, getAllShows } from 'features/movies/movieSlice'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'
import './MovieListing.scss'
import { settings } from 'common/settings'

const MovieListing = () => {
  const movies = useSelector(getAllMovies)
  const shows = useSelector(getAllShows)
  const slider = useRef()

  const getData = (list, type) => {
    return list.Response === 'True' ? (
      list.Search.map((item) => <MovieCard key={item.imdbID} data={item} />)
    ) : (
      <div className={`${type}-error`}>
        <h3>{list.Error}</h3>
      </div>
    )
  }

  let renderMovies = []
  let renderShows = []
  renderMovies = getData(movies, 'movies')
  renderShows = getData(shows, 'shows')

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h1>Movies</h1>
        <div className="movie-container">
          <Slider ref={slider} {...settings}>
            {renderMovies}
          </Slider>
        </div>
      </div>
      <div className="show-list">
        <h1>Shows</h1>
        <div className="movie-container">
          <Slider {...settings}>{renderShows}</Slider>
        </div>
      </div>
    </div>
  )
}

export default MovieListing
