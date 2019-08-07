
import React, {Component} from 'react';
import t from 'tcomb-form-native';
import ImagePicker from 'react-native-image-picker';
import { Text, TouchableHighlight, View, Alert, Image, Button } from 'react-native';
import {colors} from '../../style';
import {APP_NAME} from '../../constants';
import CustomHeader from '../../components/CustomHeader';
import styles from './Add.style';


const Form = t.form.Form;

const Product = t.struct({
  name: t.String,              
  price: t.refinement(t.Number, function (n) { return n >= 0; }),  
  quantity: t.refinement(t.Number, function (n) { return n >= 0; }),   
});

const options = {
  fields: {
    name: {
      label: 'Nom du produit' 
    },
    price: {
      label: 'Prix en FCFA'
    },
    quantity: {
      label: 'Quantité'
    }
  }
};

export default class AddScreen extends Component {

  static navigationOptions = {
    header: null
  }
  
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
  }

  onSubmit = () => {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      alert(JSON.stringify(value)) // value here is an instance of Person
    }
  }


  showMissingImageError = () => {
    Alert.alert(
      "Image manquante",
      "Vous devez choisir une image",
      [
        {
          text: 'OK',
          style: 'cancel',
        },
      ], {
        cancelable: false
      },
    );
  }


  chooseFile = () => {
    var options = {
      title: "Choisir l'image du produit",
      cancelButtonTitle: "Annuler",
      takePhotoButtonTitle: "Prendre une photo",
      chooseFromLibraryButtonTitle: "Fouiller dans la gallérie",
      mediaType: 'photo',
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: APP_NAME,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
      }
    });
  }

  render() {
    return (
      <View>
        <CustomHeader openDrawer={this.props.navigation.openDrawer} title={'Ajouter un produit'} />
        <View style={styles.container}>
          <Form
            ref="form"
            type={Product}
            options={options}
          />
          <View style={{ marginBottom: 15 }}>
            <View style={styles.imageBoxContainer}>
              <View style={{height: 200 }}>
                <Text style={{ fontSize:17 }} >Photo</Text>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: this.state.filePath.uri }}
                    style={{ width: 180, height: 180 }}
                  />
                </View>
              </View>
              <View style={styles.takeImageContainer}>
                <Button 
                  title="Choisir une photo" 
                  onPress={this.chooseFile.bind(this)}
                  color={colors.green}
                  />
              </View>
            </View>
          </View>
          <TouchableHighlight style={styles.button} onPress={this.onSubmit} underlayColor='#A6F499'>
            <Text style={styles.buttonText}>Ajouter</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
