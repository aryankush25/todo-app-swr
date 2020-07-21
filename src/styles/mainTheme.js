import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';

// Checkout https://material-ui.com/customization/default-theme/ to customize theme
// Checkout https://material-ui.com/customization/color/ to customize theme color

const mainTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: lightBlue
  }
});

export default mainTheme;
