import preset from '@rebass/preset';
import merge from 'lodash.merge';
import prism from '@theme-ui/prism/presets/theme-ui';

export default merge(preset, {
  colors: {
    text: '#f8f8f2',
    background: '#44475a',
    primary: '#bd93f9',
    secondary: '#8be9fd',
    accent: '#ff79c6',
    muted: '#282a36',
    gray: '#50fa7b',
    lightgray: '#cfcfd3'
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif'
  },
  fontWeights: {
    body: 400,
    heading: 800,
    bold: 700
  },
  sizes: {
    wide: 1280
  },
  shadows: {
    small: `0 0 0px 1px rgba(0, 0, 0, 0.25)`
  },
  links: {
    nav: {
      display: 'block',
      px: 2,
      py: 1,
      color: 'inherit',
      textDecoration: 'none',
      fontSize: 1,
      fontWeight: 'normal'
    }
  },
  variants: {
    badge: {
      display: 'inline-block',
      px: 2,
      color: 'background',
      bg: 'primary',
      borderRadius: 'circle'
    },
    info: {
      borderLeft: '0.5em solid',
      borderColor: 'primary',
      padding: '1em',
      margin: '2em 0',
      bg: 'muted'
    },
    warning: {
      borderLeft: '0.5em solid',
      borderColor: 'secondary',
      padding: '1em',
      margin: '2em 0',
      bg: 'muted'
    },
    danger: {
      borderLeft: '0.5em solid',
      borderColor: 'accent',
      padding: '1em',
      margin: '2em 0',
      bg: 'muted'
    }
  },
  styles: {
    a: {
      color: 'primary',
      transition: 'color .2s ease-out',
      ':hover,:focus': {
        color: 'secondary'
      }
    },
    inlineCode: {
      fontFamily: 'monospace',
      fontSize: '93.75%',
      color: 'secondary'
    },
    code: {
      fontFamily: 'monospace',
      color: 'secondary',
      whiteSpace: 'pre-wrap',
      fontSize: '100%'
    },
    pre: {
      ...prism,
      fontFamily: 'monospace',
      fontSize: 3,
      overflowX: 'auto',
      bg: 'muted',
      p: 3,
      borderRadius: 4,
      marginTop: '2em',
      marginBottom: '2em'
    },
    blockquote: {
      p: 0,
      mx: 0,
      fontWeight: 'bold',
      fontSize: 3
    },
    h1: {
      variant: 'text.heading',
      mt: 0,
      fontSize: [5, 6]
    },
    h2: {
      variant: 'text.heading',
      fontSize: [4, 5]
    },
    h3: {
      variant: 'text.heading',
      fontSize: 3
    },
    h4: { variant: 'text.heading' },
    h5: { variant: 'text.heading' },
    h6: { variant: 'text.heading' },
    strong: {
      color: 'secondary'
    },
    em: {
      color: 'accent'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      py: 2,
      textAlign: 'left',
      borderBottom: t => `4px solid ${t.colors.muted}`
    },
    td: {
      py: 2,
      padding: '0 1em',
      textAlign: 'left',
      borderBottom: t => `1px solid ${t.colors.muted}`
    }
  },
  forms: {
    label: {
      fontSize: 1,
      fontWeight: 'bold'
    },
    field: {
      borderColor: 'lightgray',
      ':focus': {
        borderColor: 'primary',
        outline: 'none',
        boxShadow: t => `0 0 0 2px ${t.colors.primary}`
      }
    },
    input: {
      variant: 'forms.field'
    },
    select: {
      variant: 'forms.field'
    },
    textarea: {
      variant: 'forms.field'
    },
    radio: {},
    slider: {
      bg: 'lightgray'
    },
    switch: {
      // thumb: {}
    }
  }
});
