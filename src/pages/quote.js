import React, { useState, useEffect } from "react"
import Page from "../components/page"
import SEO from "../components/seo"
// For build time fetch
// import { graphql, useStaticQuery } from "gatsby"

const QuotePage = () => {
  // Fetch quote at build time - see gatsby-node.js for underlying fetch configuration
  // const quoteData = useStaticQuery(graphql`
  //   query {
  //     quote {
  //       quote
  //       author
  //       background
  //       title
  //     }
  //   }
  // `)

  // Fetch quote at client-side runtime
  const [quote, setQuote] = useState(0) 
    useEffect(() => {
      fetch(`https://quotes.rest/qod.json`)
        .then(response => response.json())
        .then(fetchedData => {
          setQuote([fetchedData.contents.quotes[0].quote,
                    fetchedData.contents.quotes[0].author,
                    fetchedData.contents.quotes[0].background]);
        })
    }, []);

  return (
    <Page>
      <SEO title="Quote" />
      <h1>Inspirational Quote</h1>
      <p>"{quote[0]}"</p>
      <p>{quote[1]}</p>
      <img src={quote[2]} alt="" className="quote-image" />
    </Page>
  )
}

export default QuotePage
