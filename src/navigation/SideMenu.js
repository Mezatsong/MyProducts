import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {drawerLogoColor} from '../style';
import {NavigationActions, SafeAreaView} from 'react-navigation';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import routes from '../routes';
import { connect } from 'react-redux';
import { loadUsername } from '../redux/actions';

class SideMenu extends Component {
  
  componentDidMount() {
    this.props.loadUsername();
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }


  isDisabled = (route) => {
    return route.name == 'Share' && !this.props.activateShareScreen
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
              <Text style={styles.drawerTitle}>{ this.props.username }</Text>
              <Text style={styles.drawerEmail}>Built by meztsacar@gmail.com</Text>
            </View>
          </View>
          {routes.map(route => (
            <TouchableOpacity
              key={route.name}
              onPress = {this.navigateToScreen(route.name)}
              style={styles.drawerItem}
              disabled={this.isDisabled(route)}
            >
              {route.icon && (
                <View style={styles.drawerItemLogo}>
                  <Icon name={route.icon} size={22} color={this.isDisabled(route) ?  "#B8D1B7" : "#034602"}/>
                </View>
              )}
              <Text style={{ color: this.isDisabled(route) ?  "#B8D1B7" : "#034602" }}>{route.title}</Text>
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

const mapStateToProps = state => {
  return {
    username: state.username,
    activateShareScreen: state.products && state.products.length > 0
  };
};


export default connect(mapStateToProps, {
  loadUsername
})(SideMenu);