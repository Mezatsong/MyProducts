import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Header} from 'react-native-elements';
import {colors} from '../style';
import CustomSearchBar from './CustomSearchBar';
import PropTypes from 'prop-types';

export default class CustomHeader extends Component {

    state = {
        searchActive: false,
    };

   static props = {
       title: PropTypes.string.isRequired,
       isSearchEnabled: PropTypes.bool,
       openDrawer: PropTypes.func.isRequired,
   };

   static defaultProps = {
       title:'',
       isSearchEnabled: false,
       openDrawer: null,
   }


    renderTitle() {
        return (
            <Header
                leftComponent={(
                    <TouchableOpacity onPress={this.props.openDrawer} style={{marginLeft:10}}>
                        <FontAwesome name="bars" size={25} color={colors.white} />
                    </TouchableOpacity>
                )}
                centerComponent={<Text style={{ fontSize:20, fontWeight:"200", color:colors.white }}>{this.props.title}</Text>}
                rightComponent = {
                    this.props.isSearchEnabled && (
                    <TouchableOpacity onPress={() => this.setState({searchActive: !this.state.searchActive})} >
                        <FontAwesome name={"search"} size={25} color={colors.white}/>
                    </TouchableOpacity>
                )}
                containerStyle={{
                    backgroundColor: colors.green,
                    justifyContent: 'space-around',
                    height: 67,
                    paddingBottom: 25
                }}
                />
        );
    }


    renderSearchBar() {
        return (
            <CustomSearchBar onCancel = {() => this.setState({searchActive: !this.state.searchActive})}/>
        );
    }

    render() {
        return this.state.searchActive ? this.renderSearchBar() : this.renderTitle();
    }
} 