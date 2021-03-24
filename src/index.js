/** @jsx jsx */
import * as components from '@mdxp/components'
import Deck, { Zoom } from '@mdxp/core'
import ReactDOM from 'react-dom'
import { jsx } from 'theme-ui'
import deckComponents from './deck-components'
import MDXPresentation from './presentation.mdx'
import theme from './theme/theme'

const Index = () => {
  return (
    <Zoom
      maxWidth={1000}
      width={1000}
      aspectRatio={16 / 9}
      sx={{ maxWidth: '100vw', maxHeight: '100vh' }}
    >
      <Deck
        components={{ ...components, ...deckComponents }}
        theme={theme}
      >
        <MDXPresentation />
      </Deck>
    </Zoom>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
