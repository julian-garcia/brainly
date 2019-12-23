import React from "react"
import Page from "../../components/page"
import SEO from "../../components/seo"
import { graphql, Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons"

const NumberEntry = ({data}) => {
  const { word, number, image } = data.contentfulSuperLink
  return (
    <Page>
      <SEO title="Brainly - Number System" />
      <h1>Number System</h1>
      <Link to={`/number-system`} className="back-link">
        Back to listing <FontAwesomeIcon icon={faArrowCircleLeft} />
      </Link>
      <h2>{number} - {word}</h2>
      <img src={image.file.url} alt={word} className="number-image"></img>
    </Page>
  )
}

export default NumberEntry;

export const pageQuery = graphql`
  query($slug: String) {
    contentfulSuperLink(slug: { eq: $slug }) {
      word
      number
      slug
      image {
        file {
          url
        }
      }
    }
  }
`;