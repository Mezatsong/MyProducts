import React, { Component } from 'react';
import {
    Platform, ScrollView, Text, View, StatusBar
} from 'react-native';
import {
    SettingsDividerShort,
    SettingsDividerLong,
    //SettingsEditText, use my own instead
    SettingsPicker,
    SettingsCategoryHeader,
    SettingsSwitch
} from 'react-native-settings-components';
import SettingsEditText from './components/MySettingsEditText';
import { colors as c } from "../../style";
import CustomHeader from '../../components/CustomHeader';

export default class AppSettings extends Component {

  static navigationOptions = {
    header: null
  }

  constructor() {
      super();
      this.state = {
          username: '',
          storage: 'local',
          remoteIp: '',
          twoColomn: false,
          hideNullQte: false,
      };
  }

    render() {
        return (
          <View style={{flex: 1}}>
            <CustomHeader title={'Paramètres'} openDrawer={this.props.navigation.openDrawer} />
            <ScrollView style={{flex: 1, backgroundColor: (Platform.OS === 'ios') ? colors.iosSettingsBackground : colors.white}}>
                <SettingsCategoryHeader title={'Général'} textStyle={(Platform.OS === 'android') ? {color: colors.monza} : null}/>
                <SettingsDividerLong android={false}/>
                <SettingsEditText
                    title="Nom d'utilisateur"
                    dialogDescription={'Entrer votre nom'}
                    valuePlaceholder="..."
                    negativeButtonTitle={'Annuler'}
                    positiveButtonTitle={'Enregistrer'}
                    onSaveValue={(value) => {
                        console.log('username:', value);
                        this.setState({
                            username: value
                        });
                    }}
                    value={this.state.username}
                    dialogAndroidProps={{
                        widgetColor: colors.monza,
                        positiveColor: colors.monza,
                        negativeColor: colors.monza,
                    }}
                />
                <SettingsDividerShort/>
                <SettingsPicker
                    title="Type de stockage"
                    dialogDescription={''}
                    possibleValues={[
                        {label: 'Local', value: 'local'},
                        {label: 'Distant', value: 'remote'},
                    ]}
                    negativeButtonTitle={'Annuler'}
                    positiveButtonTitle={'Enregistrer'}
                    onSaveValue={value => {
                        console.log('gender:', value);
                        this.setState({
                            storage: value
                        });
                    }}
                    value={this.state.storage}
                    styleModalButtonsText={{color: colors.green}}
                />
                {this.state.storage == 'remote' && (
                  <View>
                    <SettingsDividerShort/>
                    <SettingsEditText
                        title="Adresse du serveur"
                        dialogDescription={'Adresse IP'}
                        valuePlaceholder="X.X.X.X"
                        negativeButtonTitle={'Annuler'}
                        positiveButtonTitle={'Enregistrer'}
                        onSaveValue={(value) => {
                            this.setState({
                                remoteIp: value
                            });
                        }}
                        value={this.state.remoteIp}
                        dialogAndroidProps={{
                            widgetColor: colors.monza,
                            positiveColor: colors.monza,
                            negativeColor: colors.monza,
                        }}
                    />
                  </View>)}
                <SettingsDividerLong android={false}/>
                <SettingsCategoryHeader title={'Affichage'} textStyle={{ fontWeight: "bold" }}/>
                <SettingsDividerLong android={false}/>
                <SettingsSwitch
                    title={'Affichage en mode multi-colones'}
                    onSaveValue={(value) => {
                        this.setState({
                            twoColomn: value
                        });
                    }}
                    value={this.state.twoColomn}
                    thumbColor={(this.state.twoColomn) ? colors.switchEnabled : colors.switchDisabled}
                />
                <SettingsDividerShort/>
                <SettingsSwitch
                    title={'Masquer les produits épuisés'}
                    onSaveValue={(value) => {
                        this.setState({
                            hideNullQte: value
                        });
                    }}
                    value={this.state.hideNullQte}
                    thumbColor={(this.state.hideNullQte) ? colors.switchEnabled : colors.switchDisabled}
                />
                <SettingsDividerLong android={false}/>
            </ScrollView>
        </View>);
    }
}

const colors = {
    iosSettingsBackground: 'rgb(235,235,241)',
    white: '#FFFFFF',
    monza: c.green,
    switchEnabled: (Platform.OS === 'android') ? c.green : null,
    switchDisabled: (Platform.OS === 'android') ? '#efeff3' : null,
    switchOnTintColor: (Platform.OS === 'android') ? 'rgba(199, 0, 57, 0.6)' : null,
    blueGem: '#27139A',
    green: c.green
};
