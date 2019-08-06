import React, {Component} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Header} from 'react-native-elements';
import {colors} from '../../../style';

export default class CustomHeader extends Component {


    render() {
        return (
            <Header
                leftComponent={(
                    <TouchableOpacity onPress={this.props.openDrawer}>
                        <FontAwesome name="bars" size={20} color={colors.white} />
                    </TouchableOpacity>
                )}
                centerComponent={<Text style={{ fontSize:20, fontWeight:"200", color:colors.white }}>Ajouter un produit</Text>}
                rightComponent={null}
                containerStyle={{
                    backgroundColor: colors.green,
                    justifyContent: 'space-around',
                    height: 67,
                    paddingBottom: 25
                }}
                />
        );
    }

} 