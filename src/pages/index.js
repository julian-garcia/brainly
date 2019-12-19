import React from "react"
import { Link } from "gatsby"
import Home from "../components/home"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Home>
    <SEO title="Home" />
    <Link to="/" >
      <Image />
      <h1 className="site-title">Brainly</h1>
    </Link>
  </Home>
)

export default IndexPage;
