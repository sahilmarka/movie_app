import React from 'react'
import { Link } from 'react-router-dom'
import './MovieCard.scss'

const MovieCard = ({ data }) => {
  if (!data) return null
  const { Poster, Title, imdbID, Year } = data

  return (
    <Link to={`movie/${imdbID}`}>
      <div className="card-item">
        <div className="card-inner">
          <div className="card-top">
            <img src={Poster} alt={Title} />
          </div>
          <div className="card-bottom">
            <div className="card-info">
              <h4>{`${Title.substring(0, 35)}${
                Title.length > 33 ? '....' : ''
              }`}</h4>
              <p>{Year}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
