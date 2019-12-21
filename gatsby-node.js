const fetch = require(`node-fetch`)

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get data from GitHub API at build time
  const result = await fetch(`https://quotes.rest/qod.json`)
  const resultData = await result.json()
  // create node for build time data example in the docs
  createNode({
    quote: resultData.contents.quotes[0].quote,
    author: resultData.contents.quotes[0].author,
    background: resultData.contents.quotes[0].background,
    title: resultData.contents.quotes[0].title,
    // required fields
    id: `quote-data`,
    parent: null,
    children: [],
    internal: {
      type: `Quote`,
      contentDigest: createContentDigest(resultData),
    },
  })
}