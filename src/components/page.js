import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import PageNavigation from "./pageNavigation"
import Image from "../components/image"
import { Link } from "gatsby"
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"
import "../style/style.scss"

const Page = ({ children }) => {
  const identity = useIdentityContext()
  const isLoggedIn = identity && identity.isLoggedIn
  const [dialog, setDialog] = React.useState(false)

  const data = useStaticQuery(graphql`
    query navItems {
      site {
        siteMetadata {
          navigationMenuItems,
          title
        }
      }
    }
  `)

  return (
    <div className="page">
      <Link to="/" className="page-header">
        <Image />
      </Link>
      <h1 className="site-title">{data.site.siteMetadata.title}</h1>
      <button className="page-nav__item login-btn" onClick={() => setDialog(true)}>
        {isLoggedIn ? `Log out` : "Log in"}
      </button>
      <PageNavigation menuItems={data.site.siteMetadata.navigationMenuItems} />
      <main className="page-content">
        { children }
      </main>
      <footer>
        &copy; {new Date().getFullYear()}, {` `}
        <a href="https://julian-garcia.uk" target="_blank" rel="noopener noreferrer">Julian Garcia</a>
      </footer>
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
    </div>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired
}

export default Page
