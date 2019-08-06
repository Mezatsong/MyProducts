import React, {Component} from 'react';
import {View} from 'react-native';
import { SearchBar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../style';

export default class CustomSearchBar extends Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View 
        style={{ 
                width:'100%', 
                flexDirection:'row-reverse', 
                backgroundColor: colors.white,
        }}>
            <SearchBar
                placeholder="Entrer le nom d'un produit..."
                lightTheme={true}
                onChangeText={this.updateSearch}
                value={search}
                onCancel={this.props.onCancel}
                containerStyle={{ 
                    flex:7, 
                    backgroundColor: colors.white,
                }}
                inputContainerStyle={{
                    backgroundColor: colors.white,
                }}
                inputStyle={{
                    backgroundColor: colors.white,
                    borderRadius: 15,
                    paddingLeft: 10
                }}
                searchIcon={null}
                />
            <View style={{ 
                flex:1, 
                justifyContent:"center",
                alignSelf:"flex-end", 
                paddingBottom: 20,
                alignItems:"center"}}> 
                <FontAwesome 
                    name = "arrow-left"
                    size={20} 
                    color={colors.green}
                    onPress={this.props.onCancel}/>
            </View>
      </View>
    );
  }
}