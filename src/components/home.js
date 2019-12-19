import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Navigation from "./navigation"
import "../style/style.scss"

const Home = ({ children }) => {
  const data = useStaticQuery(graphql`
    query navItemsHome {
      site {
        siteMetadata {
          navigationMenuItems
        }
      }
    }
  `)

  return (
    <>
      <Navigation menuItems={data.site.siteMetadata.navigationMenuItems} />
      <main>
        { children }
      </main>
      <footer>
        &copy; {new Date().getFullYear()}, {` `}
        <a href="https://julian-garcia.uk">Julian Garcia</a>
      </footer>
    </>
  )
}

Home.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Home
