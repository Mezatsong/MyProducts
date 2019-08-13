import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Share,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import { getProductByFilter } from '../../redux/selectors';
import styles from './Share.style';
import CustomHeader from '../../components/CustomHeader';

class ShareScreen extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)

    this.state = {
      selected: []
    }
  }

  press = (item) => {
    let list;
    if (this.isSelected(item)) {
        list = this.state.selected.filter(p => p.id !== item.id);
    } else {
        list = [...this.state.selected, item];
    }
    this.setState({
        selected: list
    });
  }

  isSelected = (item) => {
    return this.state.selected.filter(p => p.id == item.id).length > 0;
  }


  share = () => {
    let message = "*LIESTE DES PRODUITS DISPO*\n";
    this.state.selected.forEach(p => {
        message += `\n-> ${p.name} (${p.quantity} pièces): ${p.price} FCFA`;
    });

    Share.share({
        title: 'LIESTE DES PRODUITS DISPO',
        message: message,
        url: null,  //image en base64 ou url vers le net
        subject: 'LIESTE DES PRODUITS DISPO' //si le partage c'est par email
    })
    .finally();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader 
          openDrawer={this.props.navigation.openDrawer} 
          title={'Partager les produits'} 
          isSearchEnabled={true}/>
        <View style={styles.container}>
            <View style={styles.storyContainer}>
            <FlatList data={this.props.products} keyExtractor={item => item.id} extraData={this.state} renderItem={({item}) => {
                return <TouchableOpacity style={{
                flexDirection: 'row',
                padding: 10,
                borderBottomWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ecf0f1'
                }} onPress={() => {
                this.press(item)
                }}>
                <View style={{
                    flex: 3,
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}>
                    {this.isSelected(item)
                    ? (
                        <Text style={{fontWeight: 'bold'}}>{`${item.name} (${item.quantity})`}</Text>
                    )
                    : (
                        <Text>{`${item.name} (${item.quantity})`}</Text>
                    )}
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                }}>
                    {this.isSelected(item)
                    ? (
                        <Icon name="ios-checkbox" size={30} color={primaryColor}></Icon>
                    )
                    : (
                        <Icon name="ios-square-outline" size={30} color={darkGrey}></Icon>
                    )}
                </View>
                </TouchableOpacity>
            }}/>
            </View>
            <View>
            {(this.state.selected.length > 0)
                ? (
                <View style={styles.containerFooter}>
                    <View style={{
                    flex: 3,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    alignContent: 'center'
                    }}>
                    <FlatList data={this.state.selected} horizontal={true} extraData={this.state} keyExtractor={(item, index) => item.id} renderItem={({item, index}) => {
                        return <View style={{
                        paddingTop: 10
                        }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            padding: 2
                        }}>{`${item.name}${index+1 < this.state.selected.length ? ',':''} `}
                        </Text>
                        </View>
                    }}/>

                    </View>
                    <View style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      justifyContent: 'center'
                      }}>
                      <TouchableOpacity style={{
                          padding: 10
                      }} onPress={this.share}>
                        <Icon name="ios-paper-plane" size={40} color="white"></Icon>
                      </TouchableOpacity>
                    </View>
                </View>
                )
                : null
    }
            </View>
        </View>
      </View>
    );
  };
};

const primaryColor = "#1abc9c";
const darkGrey = "#bdc3c7";





const mapStateToProps = (state) => {
    const products = getProductByFilter(state);
    return {
        products
    }
}


export default connect(mapStateToProps)(ShareScreen);



