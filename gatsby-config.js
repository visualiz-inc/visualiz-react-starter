/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

// SPAでクライアントサイドでルーティングする場合はこちらにパスを追加
const clientRoutes = ["/example/*"];

module.exports = {
  // pathPrefix: `/path`, github pagesなどを利用する場合はこちらにルートパスを指定
  siteMetadata: {
    title: "",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [...clientRoutes] },
    },
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        // Default settings that may be ommitted or customized
        stages: ["develop"],
        extensions: ["js", "jsx", "ts", "tsx"],
        exclude: ["node_modules", ".cache", "public"],
      },
    },
  ],
};
