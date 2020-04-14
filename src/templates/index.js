import React from 'react';
import { render } from 'react-dom';
import { jsx, ThemeProvider } from 'theme-ui';
import theme from './theme.js';
import Src from './liminoid.mdx';
import { Box } from 'rebass';

const App = props => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: '960px',
          mx: 'auto',
          my: '4em',
          px: 4
        }}
      >
        <Src />
      </Box>
    </ThemeProvider>
  );
};

render(<App />, document.getElementById('root'));
