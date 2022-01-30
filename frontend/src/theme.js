import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark", primary: {
      main: '#CF19CC',
    }, secondary: {
      main: '#CF19CC',
    }, error: {
      main: red.A400,
    },
  }, typography: {
    fontFamily: ["Inter", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(","),
    h1: {
      fontSize: "3rem", fontWeight: 800
    },
    h2: {
      fontSize: "2.5rem", fontWeight: 700
    },
    h3: {
      fontSize: "2rem", fontWeight: 700
    },
    h4: {
      fontSize: "1.5rem", fontWeight: 700
    },
    h5: {
      fontSize: "1.25rem", fontWeight: 700
    },
    h6: {
      fontSize: "1.125rem", fontWeight: 500
    },
    button: {
      fontSize: "1.125rem", fontWeight: 700, textTransform: "none"
    },
    body1: {
      fontSize: "1rem", fontWeight: 400, lineHeight: "1.4rem"
    },
    subtitle1: {
      fontSize: "0.75rem", fontWeight: 400, lineHeight: "1.05rem"
    },
    subtitle2: {
      fontSize: "0.625rem", fontWeight: 400, lineHeight: "0.875rem"
    }
  }

}, {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true
    }
  },
});

export default theme;
