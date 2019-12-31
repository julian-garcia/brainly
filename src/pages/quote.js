import React, { useState, useEffect } from "react"
import Page from "../components/page"
import SEO from "../components/seo"

const QuotePage = () => {
  // Fetch quote at client-side runtime (as opposed to build time)
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
    </Page>
  )
}

export default QuotePage
