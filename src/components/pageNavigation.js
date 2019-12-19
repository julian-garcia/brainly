import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function closeNavMenu() {
    document.querySelector('.page-nav').classList.add('hide');
    document.querySelector('.menu-toggle').classList.remove('hide');
}

function openNavMenu() {
    document.querySelector('.page-nav').classList.remove('hide');
    document.querySelector('.menu-toggle').classList.add('hide');
}

const PageNavigation = ({ menuItems }) => (
  <>
    <nav className='page-nav hide'>
      <button className="page-nav__close" onClick={closeNavMenu}>X</button>
      <Link to="/" className="page-nav__item" key="home">Home</Link>
      {menuItems.map(item => (
        <Link to={item.split('|')[1]} className="page-nav__item" key={item}>{item.split('|')[0]}</Link>
      ))}
    </nav>
    <FontAwesomeIcon icon={faBars} className="menu-toggle"  onClick={openNavMenu} />
  </>
)

PageNavigation.propTypes = {
  menuItems: PropTypes.array,
}

export default PageNavigation
