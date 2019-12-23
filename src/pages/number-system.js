import React from "react"
import Page from "../components/page"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faLink, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

function toggleVisibility(index) {
  return function(e) {
    const showEntryElement = document.getElementById(`showEntry${index}`);
    const hideEntryElement = document.getElementById(`hideEntry${index}`);
    showEntryElement.classList.toggle('show');
    hideEntryElement.classList.toggle('show');
    if (showEntryElement.classList.contains('show')) {
      document.getElementById(`word${index}`).classList.add('hidden');
    } else {
      document.getElementById(`word${index}`).classList.remove('hidden');
    }
  }
}

const NumberPage = ({data}) => {
  const entries = data.allContentfulSuperLink.edges;
  return (
    <Page>
      <SEO title="Brainly - Number System" />
      <h1>Number System</h1>
      <p>Images can be remembered more easily than numbers, use this system to help you remember groups of numbers of any size.</p>
      <p>Each number is associated with one or more consonants. Vowels + w, h, and y are ignored.</p>
      <div className="number-list">
        {entries.map(({node: entry}, index) => (
          <div className="number-list__item" key={index}>
            <h2 className="number-list__title" id={`word${index}`}>{entry.number} - {entry.word}</h2>
            <Link to={`/number-system/entry/${entry.slug}`}>
              <FontAwesomeIcon icon={faLink} className="number-list__link" />
            </Link>
            <FontAwesomeIcon icon={faEye} className="number-list__button show" id={`hideEntry${index}`} onClick={toggleVisibility(index)} />
            <FontAwesomeIcon icon={faEyeSlash} className="number-list__button" id={`showEntry${index}`} onClick={toggleVisibility(index)} />
          </div>
        ))}
      </div>
    </Page>
  )
}

export default NumberPage;

export const query = graphql`
  query SuperLinkQuery {
    allContentfulSuperLink(sort: { fields: [number], order: ASC }) {
      edges {
        node {
          id
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
    }
  }
`;