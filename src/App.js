
import { Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import SideMenu from './Navigation/SideMenu';
import routes from './routes';

const routeConfig = {};

routes.map(route => {
  routeConfig[route.name] = {
    screen: route.screen
  }
});



const stackNav = createStackNavigator({...routeConfig});


const DrawerNavigator = createDrawerNavigator({
        Item: stackNav
    }, 
    {
        drawerWidth: Dimensions.get('window').width - 120,
        contentComponent: SideMenu,
    }
);

export default createAppContainer(DrawerNavigator);