import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { user } from 'assets/images'
import './Header.scss'
import { fetchAsyncMovies, fetchAsyncShows } from 'features/movies/movieSlice'

const Header = () => {
  const dispatch = useDispatch()
  const [term, setTerm] = useState('')
  const submitHandler = (e) => {
    // every time on submit to prevent the refresh of page we need to prevent default
    e.preventDefault()
    if (term.trim().length === 0) return alert('please enter search term!')
    dispatch(fetchAsyncMovies(term))
    dispatch(fetchAsyncShows(term))
    setTerm('')
  }
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App</Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search Movies or Shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  )
}

export default Header
