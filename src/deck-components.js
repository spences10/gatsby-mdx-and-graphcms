import React from 'react'
import { Callout } from './components/callout'
import CodeHighlight from './components/code'
import {
  Tweet as MDXTweet,
  CodePen as MDXCodePen,
  YouTube as MDXYouTube,
} from 'mdx-embed'

// Yes it looks like I have to set the width of each MDX Embed component
const Tweet = props => {
  return (
    <div style={{ width: '100%' }}>
      <MDXTweet {...props} />
    </div>
  )
}
const CodePen = props => {
  return (
    <div style={{ width: '70%' }}>
      <MDXCodePen {...props} />
    </div>
  )
}
const YouTube = props => {
  return (
    <div style={{ width: '60%' }}>
      <MDXYouTube {...props} />
    </div>
  )
}

export default {
  CodeHighlight,
  Callout,
  Tweet,
  CodePen,
  YouTube,
}
