require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Brainly`,
    description: `Progressive web app for memory improvement techniques`,
    author: `Julian Garcia`,
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
        icon: `src/images/brain.png`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `tgqacvzj7ei4`,
        accessToken: `_51PA6D8--9Q_wGc4EKHiL2NUOBst2JpHVH9Io8ClOo`
      }
    },
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: `https://nostalgic-varahamihira-efe491.netlify.com/` 
      }
    },
    {
      resolve: `gatsby-plugin-firebase`,
      options: {
        features: {
          auth: true,
          database: true,
          firestore: false,
          storage: false,
          messaging: false,
          functions: true,
          performance: false,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
