import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Platform, ScrollView, View } from 'react-native';
import {
    SettingsDividerShort,
    SettingsDividerLong,
    //SettingsEditText, use my own instead
    SettingsPicker,
    SettingsCategoryHeader,
    SettingsSwitch
} from 'react-native-settings-components';
import SettingsEditText from '../../components/MySettingsEditText';
import { colors as c } from '../../style';
import CustomHeader from '../../components/CustomHeader';
import * as APP_CONST from '../../constants';
import { connect } from 'react-redux';
import {
    changeUsername,
    changeChunk,
    changeHideNullQte
} from '../../redux/actions';

class SettingsScreen extends Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            username: '',
            storage: APP_CONST.SETTINGS_STORAGE_TYPE_VALUE_LOCAL,
            remoteIp: '',
            twoColomn: false,
            hideNullQte: false,
        };
    }


    componentDidMount() {
        AsyncStorage.multiGet([
            APP_CONST.SETTINGS_USERNAME_KEY,
            APP_CONST.SETTINGS_STORAGE_TYPE_KEY,
            APP_CONST.SETTINGS_STORAGE_END_POINT_KEY,
            APP_CONST.SETTINGS_NBR_COLUMN_KEY,
            APP_CONST.SETTINGS_HIDE_NULL_QTE
        ]).then(settings => {
            this.setState({
                username: settings[0][1] || '',
                storage: settings[1][1] || APP_CONST.SETTINGS_STORAGE_TYPE_VALUE_LOCAL,
                remoteIp: settings[2][1],
                twoColomn: settings[3][1] && parseInt(settings[3][1]) == 2,
                hideNullQte: parseInt(settings[4][1]) > 0,
            })
        });
    }


    saveUsername = name => {
        this.setState({username: name});
        this.props.changeUsername(name);
    }

    saveStorageType = type => {
        this.setState({storage:type});
        AsyncStorage.setItem(APP_CONST.SETTINGS_STORAGE_TYPE_KEY, type).finally();
    }

    saveEndPoint = endpoint => {
        this.setState({remoteIp:endpoint});
        AsyncStorage.setItem(APP_CONST.SETTINGS_STORAGE_END_POINT_KEY, value).finally();
    }

    saveTwoColomn(value) {
        this.setState({twoColomn: value});
        const chunk = value ? 2 : 1;
        this.props.changeChunk(chunk);
    }

    saveHideNullQte = value => {
        this.setState({hideNullQte: value});
        this.props.changeHideNullQte(value);
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
                    onSaveValue={(value) => this.saveUsername(value)}
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
                        {label: 'Local', value: APP_CONST.SETTINGS_STORAGE_TYPE_VALUE_LOCAL},
                        {label: 'Distant', value: APP_CONST.SETTINGS_STORAGE_TYPE_VALUE_REMOTE},
                    ]}
                    negativeButtonTitle={'Annuler'}
                    positiveButtonTitle={'Enregistrer'}
                    onSaveValue={value => this.saveStorageType(value)}
                    value={this.state.storage}
                    styleModalButtonsText={{color: colors.green}}
                />
                {this.state.storage == APP_CONST.SETTINGS_STORAGE_TYPE_VALUE_REMOTE && (
                  <View>
                    <SettingsDividerShort/>
                    <SettingsEditText
                        title="Adresse du serveur"
                        dialogDescription={'Adresse IP'}
                        valuePlaceholder="https://example.com/api"
                        negativeButtonTitle={'Annuler'}
                        positiveButtonTitle={'Enregistrer'}
                        onSaveValue={(value) => this.saveEndPoint(value)}
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
                    onSaveValue={(value) => this.saveTwoColomn(value)}
                    value={this.state.twoColomn}
                    thumbColor={(this.state.twoColomn) ? colors.switchEnabled : colors.switchDisabled}
                />
                <SettingsDividerShort/>
                <SettingsSwitch
                    title={'Masquer les produits épuisés'}
                    onSaveValue={(value) => this.saveHideNullQte(value)}
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


export default connect(null, {
    changeUsername,
    changeChunk,
    changeHideNullQte
})(SettingsScreen)