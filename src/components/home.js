import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Image from "../components/image"
import Navigation from "./navigation"
import "../style/style.scss"

const Home = ({ children }) => {
  const data = useStaticQuery(graphql`
    query navItemsHome {
      site {
        siteMetadata {
          navigationMenuItems,
          title
        }
      }
    }
  `)

  return (
    <>
      <Navigation menuItems={data.site.siteMetadata.navigationMenuItems} />
      <main>
        { children }
        <Link to="/" >
          <Image />
          <h1 className="site-title">{data.site.siteMetadata.title}</h1>
        </Link>
      </main>
      <footer>
        &copy; {new Date().getFullYear()}, {` `}
        <a href="https://julian-garcia.uk" target="_blank" rel="noopener noreferrer">Julian Garcia</a>
      </footer>
    </>
  )
}

Home.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Home
