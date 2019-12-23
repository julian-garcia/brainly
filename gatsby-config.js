module.exports = {
  siteMetadata: {
    title: `Brainly`,
    description: `Gatsby progressive web app for memory improvement techniques`,
    author: `@gatsbyjs`,
    navigationMenuItems: [`Mind maps|/mind-maps`, 
                          `Speed reading|/404`, 
                          `Quote|/quote`,
                          `Number system|/number-system`,
                          `Chaining|/404`,
                          `Gratitudes|/404`],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/brain.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `tgqacvzj7ei4`,
        accessToken: `_51PA6D8--9Q_wGc4EKHiL2NUOBst2JpHVH9Io8ClOo`
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
