// source: https://github.com/M0nica/migrating-to-mdx/blob/main/components/callout.module.css
/* @jsx jsx */
import { jsx } from '@emotion/core'
import styles from './callout.module.css'

export const Callout = ({ variant = 'info', children }) => {
  const classes = `${styles.infoBox} ${styles[variant]}`

  const variantStyles = {
    info: {
      borderLeft: '4px solid #b4aaff',
      backgroundColor: 'rgba(224, 226, 255, 0.5)',
      color: '#2a2135',
    },
    danger: {
      borderLeft: '4px solid #ff7828',
      backgroundColor: 'rgb(53, 236, 234)',
    },
    garden: {
      borderLeft: '4px solid #72bc23',
      backgroundColor: 'rgb(249, 253, 234)',
    },
    book: {
      borderLeft: '4px solid #44a9ba',
      backgroundColor: 'rgb(234, 248, 253);',
    },
  }
  return (
    <aside
      css={{
        margin: '1.5rem auto',
        borderRadius: '0px 10px 10px 0px',
        padding: '0.8em 1em',
        lineHeight: '1.2',
        textAlign: 'center',
        position: 'relative',
        clear: 'both',
        width: '70%',
        ...variantStyles[variant],
      }}
      className={classes}
    >
      {children}
    </aside>
  )
}
