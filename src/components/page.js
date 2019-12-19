import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import PageNavigation from "./pageNavigation"
import Image from "../components/image"
import { Link } from "gatsby"

import "../style/style.scss"

const Page = ({ children }) => {
  const data = useStaticQuery(graphql`
    query navItems {
      site {
        siteMetadata {
          navigationMenuItems
        }
      }
    }
  `)

  return (
    <div className="page">
      <Link to="/" className="page-header">
        <Image />
      </Link>
      <h1 className="site-title">Brainly</h1>
      <PageNavigation menuItems={data.site.siteMetadata.navigationMenuItems} />
      <main className="page-content">
        { children }
      </main>
      <footer>
        &copy; {new Date().getFullYear()}, {` `}
        <a href="https://julian-garcia.uk">Julian Garcia</a>
      </footer>
    </div>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Page
