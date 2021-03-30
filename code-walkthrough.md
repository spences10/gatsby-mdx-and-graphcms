## What do I need?

If you're going to follow along then there's a few things you'll need.

- a basic web development setup:
  [Node](https://nodejs.org/en/download/), terminal (bash, zsh or
  fish)
- a text editor.
- a basic understanding of React.

## Hello world

```bash
# create the project directory
mkdir my-gatsby-blog
# change into the directory
cd my-gatsby-blog
# initialise a package.json file
yarn init -y
# initialise the git repo
git init
```

```bash
# create .gitignore file in my directory
touch .gitignore
# add ignore contents with echo
echo "# Project dependencies
.cache
node_modules
# Build directory
public
# Other
.DS_Store
yarn-error.log" > .gitignore
```

```bash
yarn add gatsby react react-dom
# -p is to create parent directories too if needed
mkdir -p src/pages
# create the index (home) page
touch src/pages/index.js
```

```jsx
import React from 'react'

export default function IndexPage() {
  return <h1>Hello World!</h1>
}
```

```bash
# if you're using npm 👇
# $(npm bin)/gatsby develop
yarn gatsby develop
```

```json
"scripts": {
  "build": "gatsby build",
  "dev": "gatsby develop -p 8945 -o",
  "serve": "gatsby serve -p 9854 -o",
  "clean": "gatsby clean"
},
```

```bash
# add everything for committing
git add .
# commit to repo
git commit -m 'init project'
```

## Content for the blog

```bash
# this creates the folders in the root of the project
mkdir -p content/2021/03/{06/hello-world,07/second-post,08/third-post}
# create individual files
touch content/2021/03/06/hello-world/index.mdx
touch content/2021/03/07/second-post/index.mdx
touch content/2021/03/08/third-post/index.mdx
```

## Frontmatter

```markdown
---
title: Hello World - from mdx!
date: 2021-03-06
---

My first post!!

## h2 Heading

Some meaningful prose

### h3 Heading

Some other meaningful prose
```

Post two!

```markdown
---
title: Second Post!
date: 2021-03-07
---

This is my second post!
```

Post three!

````markdown
---
title: Third Post!
date: 2021-03-08
---

This is my third post!

> with a block quote! And a code block:

```js
const wheeeeee = true
```
````

```bash
# add changed file for committing
git add .
# commit to repo
git commit -m 'add markdown files'
```

## Gatsby config

```bash
touch gatsby-config.js
```

## Gatsby plugins

```bash
yarn add gatsby-plugin-mdx @mdx-js/mdx @mdx-js/react gatsby-source-filesystem
```

```js
module.exports = {
  plugins: [
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
  ],
}
```

```bash
git add .
git commit -m 'add gatsby plugins'
```

## Gatsby GraphQL

```bash
You can now view my-gatsby-blog in the browser.
⠀
  http://localhost:8000/
⠀
View GraphiQL, an in-browser IDE, to explore your site's data and schema
⠀
  http://localhost:8000/___graphql
```

## Query local files with GraphQL

```graphql
{
  allMdx {
    nodes {
      frontmatter {
        title
        date
      }
    }
  }
}
```

```json
{
  "data": {
    "allMdx": {
      "nodes": [
        {
          "frontmatter": {
            "title": "Hello World - from mdx!",
            "date": "2021-03-06T00:00:00.000Z"
          }
        },
        {
          "frontmatter": {
            "title": "Second Post!",
            "date": "2021-03-07T00:00:00.000Z"
          }
        },
        {
          "frontmatter": {
            "title": "Third Post!",
            "date": "2021-03-08T00:00:00.000Z"
          }
        }
      ]
    }
  },
  "extensions": {}
}
```

## Site metadata

```js
const siteMetadata = {
  title: `My Gatsby Blog`,
  description: `This is my coding blog.`,
}
```

```graphql
{
  site {
    siteMetadata {
      title
      description
    }
  }
}
```

```json
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "My Gatsby Blog",
        "description": "This is my coding blog."
      }
    }
  },
  "extensions": {}
}
```

## Make a site metadata hook

```js
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

export default function IndexPage() {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  console.log('=====================')
  console.log(siteMetadata)
  console.log('=====================')
  return <h1>Hello World!</h1>
}
```

```bash
# make a folder for all the hooks to live
mkdir src/hooks
# creathe the file
touch src/hooks/use-site-metadata.js
```

```js
import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )
  return site.siteMetadata
}
```

```diff
+ query SITE_METADATA_QUERY {
  site {
    siteMetadata {
      title
      description
    }
  }
}
```

```js
import React from 'react'
import { useSiteMetadata } from '../hooks/use-site-metadata'

export default function IndexPage() {
  const { title, description } = useSiteMetadata()
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  )
}
```

```bash
git add .
git commit -m 'add site metadata and metadata hook'
```

## Styling with Theme UI

```bash
yarn add theme-ui gatsby-plugin-theme-ui @theme-ui/presets
```

```js
module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      // rest of the module unchanged
```

```bash
# create the folder for the Theme UI theme
mkdir src/gatsby-plugin-theme-ui
# create the theme file
touch src/gatsby-plugin-theme-ui/index.js
```

```js
import { deep, swiss } from '@theme-ui/presets'

const theme = {
  ...swiss,
  colors: {
    ...swiss.colors,
    modes: {
      dark: {
        ...deep.colors,
      },
    },
  },
  styles: {
    ...swiss.styles,
    p: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      fontSize: 3,
    },
  },
}

export default theme
```

```bash
git add .
git commit -m 'add Theme UI and configure presets'
```

## Layout component

```bash
# create a components folder
mkdir src/components
# create Layout and Header files
touch src/components/header.js src/components/layout.js
```

```js
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { Box, Heading, Link } from 'theme-ui'

export const Header = ({ siteTitle, siteDescription }) => {
  return (
    <Box as="header" sx={{ bg: 'highlight', mb: '1.45rem' }}>
      <Box
        as="div"
        sx={{
          m: '0 auto',
          maxWidth: '640px',
          p: '1.45rem 1.0875rem',
        }}
      >
        <Link as={GatsbyLink} to="/">
          <Heading>{siteTitle}</Heading>
        </Link>
        <Box as="p" variant="styles.p">
          {siteDescription}
        </Box>
      </Box>
    </Box>
  )
}
```

```js
import React from 'react'
import { Box } from 'theme-ui'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { Header } from './header'

export const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <>
      <Header siteTitle={title} siteDescription={description} />
      <Box
        as="div"
        sx={{
          margin: '0 auto',
          maxWidth: '640px',
          padding: '0 1.0875rem 1.45rem',
        }}
      >
        <Box as="main">{children}</Box>
      </Box>
    </>
  )
}
```

```js
<Layout>
  <h1>This is wrapped</h1>
</Layout>
```

```js
import React from 'react'
import { Layout } from '../components/layout'

export default function IndexPage() {
  return (
    <>
      <Layout>
        <h1>This is wrapped</h1>
      </Layout>
    </>
  )
}
```

## Index page posts query

```graphql
{
  allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
    nodes {
      id
      slug
      excerpt(pruneLength: 250)
      frontmatter {
        title
        date(formatString: "YYYY MMMM Do")
      }
    }
  }
}
```

```json
{
  "data": {
    "allMdx": {
      "nodes": [
        {
          "id": "2bed526a-e5a9-5a00-b9c0-0e33beafdbcf",
          "slug": "2021/03/08/third-post/",
          "excerpt": "This is my third post! with a block quote! And a code block:",
          "frontmatter": {
            "title": "Third Post!",
            "date": "2021 March 8th"
          }
        },
        {
          "id": "89ea266b-c981-5d6e-87ef-aa529e98946e",
          "slug": "2021/03/07/second-post/",
          "excerpt": "This is my second post!",
          "frontmatter": {
            "title": "Second Post!",
            "date": "2021 March 7th"
          }
        },
        {
          "id": "75391ba1-3d6b-539f-86d2-d0e6b4104806",
          "slug": "2021/03/06/hello-world/",
          "excerpt": "My first post!! h2 Heading Some meaningful prose h3 Heading Some other meaningful prose",
          "frontmatter": {
            "title": "Hello World - from mdx!",
            "date": "2021 March 6th"
          }
        }
      ]
    }
  },
  "extensions": {}
}
```

```js
import { graphql, Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { Box, Heading, Link } from 'theme-ui'
import { Layout } from '../components/layout'

export default function IndexPage({ data }) {
  return (
    <>
      <Layout>
        {data.allMdx.nodes.map(
          ({ id, excerpt, frontmatter, slug }) => (
            <Box
              key={id}
              as="article"
              sx={{
                mb: 4,
                p: 3,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #d1d1d1',
                borderRadius: '15px',
              }}
            >
              <Link as={GatsbyLink} to={`/${slug}`}>
                <Heading>{frontmatter.title}</Heading>
                <Box as="p" variant="styles.p">
                  {frontmatter.date}
                </Box>
                <Box as="p" variant="styles.p">
                  {excerpt}
                </Box>
              </Link>
            </Box>
          )
        )}
      </Layout>
    </>
  )
}

export const query = graphql`
  query SITE_INDEX_QUERY {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY MMMM Do")
        }
        slug
      }
    }
  }
`
```

```js
{data.allMdx.nodes.map(({ excerpt, frontmatter, slug }) => (
```

```bash
git add .
git commit -m 'add Header and Layout components'
```

## Using the Gatsby File System Route API with MDX

```bash
# create the route api file
touch src/pages/{mdx.slug}.js
```

```js
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { Box } from 'theme-ui'

export default function PostPage({ data }) {
  const {
    body,
    frontmatter: { title },
  } = data.mdx
  return (
    <>
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
      frontmatter {
        date
        title
      }
    }
  }
`
```

```graphql
query POST_BY_SLUG($slug: String) {
  mdx(slug: { eq: $slug }) {
    id
    slug
    body
    frontmatter {
      date
      title
    }
  }
}
```

```json
{
  "data": {
    "mdx": null
  },
  "extensions": {}
}
```

```json
{
  "slug": "2021/03/08/third-post/"
}
```

```json
{
  "data": {
    "mdx": {
      "id": "105a5c78-6a36-56e8-976c-d53d8e6ca623",
      "slug": "2021/01/08/third-post/",
      "body": "function _extends() ...", // compiled MDX here
      "frontmatter": {
        "date": "2021-03-08T00:00:00.000Z",
        "title": "Third Post!"
      }
    }
  },
  "extensions": {}
}
```

```bash
git add .
git commit -m 'create file route API file'
```

## Root wrapper concept

```bash
# create gatsby-browser.js and gatsby-ssr.js and root-wrapper.js
touch gatsby-browser.js gatsby-ssr.js root-wrapper.js
```

```js
// root-wrapper.js
import React from 'react'
import { Layout } from './src/components/layout'

export const rootWrapper = ({ element }) => {
  return <Layout>{element}</Layout>
}
```

```js
import { rootWrapper } from './root-wrapper'

export const wrapPageElement = rootWrapper
```

```jsx
import { graphql, Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { Box, Heading, Link } from 'theme-ui'
import { Layout } from '../components/layout'
export default function IndexPage({ data }) {
  return (
    <>
      <Layout>
        {data.allMdx.nodes.map(
          ({ id, excerpt, frontmatter, slug }) => (
            <Box
              key={id}
              as="article"
              sx={{
                mb: 4,
                p: 3,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #d1d1d1',
                borderRadius: '15px',
              }}
            >
              <Link as={GatsbyLink} to={`/${slug}`}>
                <Heading>{frontmatter.title}</Heading>
                <Box as="p" variant="styles.p">
                  {frontmatter.date}
                </Box>
                <Box as="p" variant="styles.p">
                  {excerpt}
                </Box>
              </Link>
            </Box>
          )
        )}
      </Layout>
    </>
  )
}
// rest unchanged
```

```bash
git add .
git commit -m 'add root wrapper to Gatsby Browser and SSR'
```

## 404 page

```bash
# create the 404.js page
touch src/pages/404.js
```

```js
import React from 'react'
import { Box, Heading } from 'theme-ui'

export default function NotFound() {
  return (
    <>
      <Heading variant="styles.h1">
        Page not found!
        <span role="img" aria-label="crying face">
          😢
        </span>
      </Heading>
      <Box as="h2" variant="styles.h2">
        It looks like that page doesn't exist
      </Box>
    </>
  )
}
```

```bash
git add .
git commit -m 'add 404 page'
```

## Dark theme toggle

```jsx
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { Box, Button, Heading, Link, useColorMode } from 'theme-ui'
export const Header = ({ siteTitle, siteDescription }) => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <Box as="header" sx={{ bg: 'highlight', mb: '1.45rem' }}>
      <Box
        as="div"
        sx={{
          m: '0 auto',
          maxWidth: '640px',
          p: '1.45rem 1.0875rem',
        }}
      >
        <Link as={GatsbyLink} to="/">
          <Heading>{siteTitle}</Heading>
        </Link>
        <Box as="p" variant="styles.p">
          {siteDescription}
        </Box>
        <Button
          onClick={e => {
            setColorMode(colorMode === 'default' ? 'dark' : 'default')
          }}
        >
          {colorMode === 'default' ? 'Dark' : 'Light'}
        </Button>
      </Box>
    </Box>
  )
}
```

```jsx
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  useColorMode,
} from 'theme-ui'
export const Header = ({ siteTitle, siteDescription }) => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <Box as="header" sx={{ bg: 'highlight', mb: '1.45rem' }}>
      <Box
        as="div"
        sx={{
          m: '0 auto',
          maxWidth: '640px',
          p: '1.45rem 1.0875rem',
        }}
      >
        <Flex>
          <Box sx={{ flex: '1 1 auto', flexDirection: 'column' }}>
            <Link as={GatsbyLink} to="/">
              <Heading>{siteTitle}</Heading>
            </Link>
            <Box as="p" variant="styles.p">
              {siteDescription}
            </Box>
          </Box>
          <Button
            onClick={e => {
              setColorMode(
                colorMode === 'default' ? 'dark' : 'default'
              )
            }}
          >
            {colorMode === 'default' ? 'Dark' : 'Light'}
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}
```

```bash
git add .
git commit -m 'add theme toggle to header'
```

## Code blocks

```bash
# install the package
yarn add @theme-ui/prism
# create Theme UI components file
touch src/gatsby-plugin-theme-ui/components.js
```

```js
import Prism from '@theme-ui/prism'

export default {
  pre: props => props.children,
  code: Prism,
}
```

```jsx
// scr/gatsby-plugin-theme-ui/index.js
import { deep, swiss } from "@theme-ui/presets";
import nightOwl from "@theme-ui/prism/presets/night-owl.json";
const theme = {
  ...swiss,
  colors: {
    ...swiss.colors,
    modes: {
      dark: {
        ...deep.colors,
      },
    },
  },
  styles: {
    ...swiss.styles,
    code: {
      ...nightOwl,
    },
    // remainder of the file unchanged
```

```bash
git add .
git commit -m 'add Prism package and update theme object'
```

## Add components to the MDX

```bash
# create component file
touch src/components/rainbow-text.js
# install @emotion/react
yarn add @emotion/react
```

```jsx
import { keyframes } from '@emotion/react'
import React from 'react'
import { Box } from 'theme-ui'

export const RainbowText = ({ children }) => {
  const rainbow = keyframes({
    '0%': {
      backgroundPosition: '0 0',
    },
    '50%': {
      backgroundPosition: '400% 0',
    },
    '100%': {
      backgroundPosition: '0 0',
    },
  })
  return (
    <Box
      as="span"
      variant="styles.p"
      sx={{
        fontWeight: 'heading',
        cursor: 'pointer',
        textDecoration: 'underline',
        ':hover': {
          background:
            'linear-gradient(90deg, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee) 0% 0% / 400%',
          animationDuration: '10s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite',
          animationName: `${rainbow}`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      }}
    >
      {children}
    </Box>
  )
}
```

````markdown
---
title: Third Post!
date: 2021-03-08
---

import { RainbowText } from
"../../../../../src/components/rainbow-text";

This is my third post!

> with a block quote!

<RainbowText>Wheeeeeeee</RainbowText>

And a code block:

```js
const wheeeeee = true
```
````

```js
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import { Layout } from './src/components/layout'
import { RainbowText } from './src/components/rainbow-text'

const MDXComponents = {
  RainbowText,
}

export const rootWrapper = ({ element }) => {
  return (
    <Layout>
      <MDXProvider components={MDXComponents}>{element}</MDXProvider>
    </Layout>
  )
}
```

````markdown
---
title: Third Post!
date: 2021-03-08
---

This is my third post!

> with a block quote!

<RainbowText>Wheeeeeeee</RainbowText>

And a code block:

```js
const wheeeeee = true
```
````

```bash
git add .
git commit -m 'add component for mdx'
```

## Markdown Images

```markdown
---
title: Hello World - from mdx!
date: 2021-03-06
---

My first post!!

## h2 Heading

![mdx logo](./mdx-logo.png) Some meaningful prose

### h3 Heading

Some other meaningful prose
```

```bash
yarn add gatsby-remark-images gatsby-plugin-sharp
```

```js
const siteMetadata = {
  title: `My Gatsby Blog`,
  description: `This is my coding blog.`,
}

module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 640,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
  ],
}
```

```bash
git add .
git commit -m 'add and configure images'
```

## SEO or GraphCMS?
