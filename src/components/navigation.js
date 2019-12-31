import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

const Navigation = ({ menuItems }) => (
  <nav className='nav'>
    {menuItems.map(item => (
      <Link to={item.split('|')[1]} className="nav__item" key={item}>{item.split('|')[0]}</Link>
    ))}
  </nav>
)

Navigation.propTypes = {
  menuItems: PropTypes.array,
}

export default Navigation
