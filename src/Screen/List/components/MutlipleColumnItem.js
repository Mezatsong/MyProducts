import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {styles} from '../List.style';
import {colors} from '../../../style';

export default class MultipleColumnItem extends Component {

    constructor(props) {
        super(props);
    }

    onItemLongPress = (item) => {
        Alert.alert(
            'Supprimer',
            `Supprimer ${item.name} ?`,
            [
                //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {
                    text: 'Non',
                    //onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Oui', 
                    onPress: () => this.props.onDelete(item)
                },
            ],
            {cancelable: true},
        );
    }

    render() {
        return (
            <TouchableOpacity 
                key={this.props.item.id} 
                onPress={() => this.props.onItemTouched(this.props.item)}
                onLongPress={() => this.onItemLongPress(this.props.item)}>
                <View style={styles.itemOneContainer}>
                    <View style={styles.itemOneImageContainer}>
                        <Image style={styles.itemOneImage} source={{ uri: this.props.item.image }} />
                    </View>
                    <View style={styles.itemOneContent}>
                        <Text style={styles.itemOneTitle} numberOfLines={1}>
                            { this.props.item.name.toUpperCase() }
                        </Text>
                        <Text
                            style={styles.itemOneSubTitle}
                            styleName="collapsible"
                            numberOfLines={3}
                        >
                        { this.props.item.name }
                        </Text>
                        <View style={[styles.itemOnePrice, {flex:1, flexDirection: 'row'}]} numberOfLines={1}>
                            <Text style={{ flex:5 }}>{this.props.item.price} FCFA</Text>
                            <View
                                style={[
                                    styles.badge,
                                    this.props.item.quantity > 0 && { backgroundColor: colors.orange },
                                    this.props.item.quantity > 5 && { backgroundColor: colors.green },
                                    { flex: 1 }
                                ]}
                            >
                                <Text style={{ fontSize: 10, color: colors.white }} styleName="bright">{this.props.item.quantity}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}