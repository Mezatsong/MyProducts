import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {drawerLogoColor} from '../style';
import {NavigationActions, SafeAreaView} from 'react-navigation';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import routes from '../routes';

class SideMenu extends Component {
  
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.headerLogo}>
              <Icon name="user" size={50} color={drawerLogoColor} />
            </View>
            <View style={styles.subTitle}>
              <Text style={styles.drawerTitle}>Descartes Mam App</Text>
              <Text style={styles.drawerEmail}>descartesoumbo@gmail.com</Text>
            </View>
          </View>
          {routes.map(route => (
            <TouchableOpacity
              key={route.screen}
              onPress = {this.navigateToScreen(route.name)}
              style={styles.drawerItem}
            >
              {route.icon && (
                <View style={styles.drawerItemLogo}>
                  <Icon name={route.icon} size={22} color={"#034602"}/>
                </View>
              )}
              <Text style={{ color: "#034602" }}>{route.title}</Text>
            </TouchableOpacity>
          ))}
        </SafeAreaView>
      </ScrollView>
    );
  }
}




SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;