import BootstrapStyleSheet from 'react-native-bootstrap-styles';


const
  BODY_COLOR = '#000022',
  TEXT_MUTED = '#888888',
  PRIMARY = '#2D7CC2';

// custom constants
const constants = {
  BODY_COLOR, TEXT_MUTED, PRIMARY
};

// custom classes
const classes = {
  title: {
    color: 'red',
  }
};
 

export const colors = {
  primary: '#555CC4',
  primaryLight: '#829BF8',
  primaryGradientStart: '#4f44b6',
  primaryGradientEnd: '#4f44b6',
  secondaryGradientStart: '#FF1358',
  secondaryGradientEnd: '#FF1358',
  profileGradientStart: '#54CBF6',
  profileGradientEnd: '#49D2D0',
  secondary: '#FF1358',
  grey: '#acacac',
  gray: '#5f5f5f',
  darkGray: '#4d4d4d',
  lightGray: '#9b9b9b',
  white: '#ffffff',
  blue: '#5A81F7',
  bluish: '#F1F1F7',
  black: '#000000',
  green: '#6DD0A3',
  yellow: '#ffc247',
  orange: '#FC8825',
};


//Design Color System
/* const primaryLight = '#607D8B';
const primaryDark = '#455A64';
const secondaryLigth = '#CFD8DC'; */

const primaryLight = colors.green;
const primaryDark = colors.green;
const secondaryLigth = colors.green;

// AppBar (Header) styles
export const bgStatusBar = primaryDark;
export const bgHeader = primaryLight;
export const headerColor = '#fff';


// Drawer Styles
export const bgDrawer = '#fff';
export const bgDrawerHeader = secondaryLigth;
export const drawerHeaderColor = '#000'
export const drawerLogoColor = bgHeader;
export const drawerInactiveItemColor = colors.green;
export const bgDrawerInactiveItem = '#ffffff';



const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes);
export const BoostrapStyle = bootstrapStyleSheet.create();
export const BoostrapConstants = bootstrapStyleSheet.constants;

 