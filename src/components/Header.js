import PropTypes from 'prop-types'
// we don't need this any more
// import React from 'react'

const Header = (props) => {
  return (
    <header className='header'>
      <h1>{props.title}</h1>
      <button className="btn">Add</button>
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header;
