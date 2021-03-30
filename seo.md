## Add SEO

```bash
yarn add react-seo-component react-helmet gatsby-plugin-react-helmet
```

```js
module.exports = {
  siteMetadata,
  plugins: [
   `gatsby-plugin-react-helmet`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-sharp`,
    {
  // rest unchanged
```

```js
const siteMetadata = {
  title: `My Gatsby Blog`,
  description: `This is my coding blog.`,
  lastBuildDate: new Date(Date.now()).toISOString(),
  siteUrl: `https://dummy-url-for-now.com`,
  authorName: `Author McAuthorson`,
  twitterUsername: `@authorOfPosts`,
  siteLanguage: `en-GB`,
  siteLocale: `en_gb`,
}
```

```js
// src/hooks/use-site-metadata.js
import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
            lastBuildDate
            siteUrl
            authorName
            twitterUsername
            siteLanguage
            siteLocale
          }
        }
      }
    `
  )
  return site.siteMetadata
}
```

```js
// {mdx.slug}.js
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import SEO from 'react-seo-component'
import { Box } from 'theme-ui'
import { useSiteMetadata } from '../hooks/use-site-metadata'

export default function PostPage({ data }) {
  const {
    body,
    slug,
    excerpt,
    frontmatter: { title, date },
  } = data.mdx
  const {
    title: siteTitle,
    siteUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
    authorName,
  } = useSiteMetadata()
  return (
    <>
      <SEO
        title={title}
        titleTemplate={siteTitle}
        description={excerpt}
        pathname={`${siteUrl}${slug}`}
        article={true}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
        author={authorName}
        publishedDate={date}
        modifiedDate={new Date(Date.now()).toISOString()}
      />
      <Box as="h1" variant="styles.h1" fontSize="4xl">
        {title}
      </Box>
      <MDXRenderer>{body}</MDXRenderer>
    </>
  )
}
export const query = graphql`
  query POST_BY_SLUG($slug: String) {
    mdx(slug: { eq: $slug }) {
      id
      slug
      body
      excerpt
      frontmatter {
        date
        title
      }
    }
  }
`
```

```js
// src/pages/index.js
import { graphql, Link as GatsbyLink } from "gatsby";
import React from "react";
 import SEO from "react-seo-component";
import { Box, Heading, Link } from "theme-ui";
 import { useSiteMetadata } from "../hooks/use-site-metadata";
export default function IndexPage({ data }) {
  const {
    title,
    description,
    siteUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
  } = useSiteMetadata();
  return (
    <>
      <SEO
        title={`Home`}
        titleTemplate={title}
        description={description}
        pathname={siteUrl}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
      />
      {data.allMdx.nodes.map(({ id, excerpt, frontmatter, slug }) => (
// rest of component unchanged
```

```bash
# build the site first
yarn build
# use gatsby serve to run built site locally
yarn serve
```

```bash
git add .
git commit -m 'add SEO component :sweat_smile:'
```

## Push it to GitHub
