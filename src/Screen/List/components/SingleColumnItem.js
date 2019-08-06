import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {styles} from '../List.style';
import {colors} from '../../../style';

import Swipeable from 'react-native-swipeable-row';

export default class SingleColumnItem extends Component {

    constructor(props) {
        super(props);
    }


    onRightActionRelease = (item) => {
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
            ], {
                cancelable: true
            },
        );
    }

    render() {
        return (
            <Swipeable 
                onRightActionRelease = {
                    () => this.onRightActionRelease(this.props.item)
                }
                rightContent={(
                <Text style={{paddingVertical:50, color: colors.secondary }}>Supprimer</Text>
            )}>
            <TouchableOpacity 
                key={this.props.item.id} 
                style={styles.itemThreeContainer} 
                onPress = {() => this.props.onItemTouched(this.props.item)}>
                <View style={styles.itemThreeSubContainer}>
                    <Image source={{ uri: this.props.item.image }} style={styles.itemThreeImage} />
                    <View style={styles.itemThreeContent}>
                        <Text style={styles.itemThreeTitle} numberOfLines={1}>{this.props.item.name}</Text>
                        <View>
                            <Text style={styles.itemThreeSubtitle}  numberOfLines={3}>{this.props.item.name}</Text>
                        </View>
                        <View style={styles.itemThreeMetaContainer}>
                            {(
                            <View
                                style={[
                                styles.badge,
                                this.props.item.quantity > 0 && { backgroundColor: colors.orange },
                                this.props.item.quantity > 5 && { backgroundColor: colors.green },
                                ]}
                            >
                                <Text
                                    style={{ fontSize: 10, color: colors.white }}
                                    styleName="bright"
                                >
                                {this.props.item.quantity}
                                </Text>
                            </View>
                            )}
                            <Text style={styles.itemThreePrice}>{this.props.item.price} FCFA</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.itemThreeHr} />
            </TouchableOpacity>
        </Swipeable>
        );
    }
}