import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Page from "../components/page"
import SEO from "../components/seo"


const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
      query navItems404 {
        site {
          siteMetadata {
            navigationMenuItems
          }
        }
      }
    `)
  return (
    <Page>
      <SEO title="404: Not found" />
      <h1>I couldn't find that <span role="img" aria-label="jsx-a11y/accessible-emoji">&#128528;</span></h1>
      <p>This page does not exist. Here's a list of all our links, please <Link to="/">contact us</Link> if you can't find what you need here.</p>
      {data.site.siteMetadata.navigationMenuItems.map(item => (
        <Link to={item.split('|')[1]} className="page-nav__item inline" key={item}>{item.split('|')[0]}</Link>
      ))}
    </Page>
  )
}

export default NotFoundPage
