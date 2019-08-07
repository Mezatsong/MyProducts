import React, { Component } from 'react';
import {View, FlatList} from 'react-native';
import {styles} from './List.style';
import {colors} from '../../style';
import CheckAlert from 'react-native-awesome-alert';
import UpdateItemAlert from './components/UpdateItemAlert';
import SingleColumnItem from './components/SingleColumnItem';
import MultipleColumnItem from './components/MutlipleColumnItem';
import CustomHeader from '../../components/CustomHeader';


export default class ListScreen extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        let data = [], chunk = 1;
        if(chunk == 2)
            for (let i = 0, j = listData.length; i < j; i += chunk) {
                data.push(listData.slice(i, i + chunk));
            }
        else 
            data = listData;
        this.state = {
            data: data,
            chunk: chunk,
            value: null
        };
    }


    onItemTouched = (item) => {
        this.setState({value:item.quantity});
        this.checkAlert.alert(
            `Mettre à jour le stock (${item.name})`,
            <UpdateItemAlert item={item}></UpdateItemAlert>,
            [{
                text: "OK",
                onPress: () => null,
                id: "helloAlert"
            },
            {
                text: "Annuler",
                onPress: () => null
            }]
        );
    };


    onDelete = (item) => {
        //Todo delete item.
        alert('item deleted')
    }

    renderItemSingleColumn = ({ item }) => (
        <SingleColumnItem 
            item={item} 
            onDelete={this.onDelete}
            onItemTouched={this.onItemTouched}/>
    );


    renderItemMutlipleColumn = rowData => {
        const cellViews = rowData.item.map(item => 
            <MultipleColumnItem 
                item={item} 
                onDelete={this.onDelete}
                onItemTouched={this.onItemTouched} />
        );
        return (
        <View key={rowData.item[0].id} style={styles.itemOneRow}>
            {cellViews}
        </View>
        );
    };


    renderItem = row => (this.state.chunk == 1) ? this.renderItemSingleColumn(row) : this.renderItemMutlipleColumn(row);

    render() {
        return (
            <View style={styles.container}>
                <CustomHeader  
                    openDrawer={this.props.navigation.openDrawer} 
                    title={'Liste des produits'} 
                    isSearchEnabled={true}/>
                <CheckAlert
                    styles={{
                        modalContainer: { backgroundColor: "rgba(49,49,49,0.8)" },
                        checkBox: { padding: 10 },
                        modalView: { marginBottom: 10, borderRadius: 0 }
                    }}
                    ref={ref => (this.checkAlert = ref)}
                    modalProps={{
                        transparent: true,
                        animationType: "slide",
                        //onShow: () => alert("onShow!")
                    }}
                    checkBoxColor="red"
                    />
                <FlatList
                    keyExtractor={item => item.id }
                    style={{ backgroundColor: colors.white, paddingHorizontal: 15 }}
                    data={this.state.data}
                    renderItem = {this.renderItem}
                />
            </View>
        );
    } 

}
 
const listData = [
    {
        id: 1,
        name: 'Limited Edition',
        price: 1299,
        quantity: Math.round(Math.random() * 100),
        image: 'https://reactnativestarter.com/demo/images/city-sunny-people-street.jpg',
    },
    {
        id: 2,
        name: 'Office, prom or special parties is all dressed up',
        price: 2500,
        quantity: Math.round(Math.random() * 100),
        image: 'https://reactnativestarter.com/demo/images/pexels-photo-26549.jpg',
    },
    {
        id: 3,
        name: 'CITIZEN ECO-DRIVE',
        price: 29.99,
        quantity: Math.round(Math.random() * 100),
        image: 'https://reactnativestarter.com/demo/images/pexels-photo-30360.jpg',
    },
    {
        id: 4,
        name: 'Citizen',
        price: 129,
        quantity: Math.round(Math.random() * 100),
        image: 'https://reactnativestarter.com/demo/images/pexels-photo-37839.jpg',
    },
    {
        id: 5,
        name: 'NEXT-LEVEL WEAR',
        price: 29.99,
        quantity: Math.round(Math.random() * 100),
        image: 'https://reactnativestarter.com/demo/images/pexels-photo-69212.jpg',
    },
    {
        id: 6,
        name: 'Mad Perry',
        price: 29.99,
        quantity: Math.round(Math.random() * 100),
        image: 'https://reactnativestarter.com/demo/images/pexels-photo-108061.jpg',
    },
    {
        id: 7,
        name: 'CITIZEN ECO-DRIVE',
        price: 129.9,
        quantity: Math.round(Math.random() * 100),
        image: 'https://reactnativestarter.com/demo/images/pexels-photo-126371.jpg',
    },
    {
        id: 8,
        name: 'Weeknight',
        price: 29.99,
        quantity: Math.round(Math.random() * 100),
        image: 'https://reactnativestarter.com/demo/images/pexels-photo-165888.jpg',
    },
    {
        id: 9,
        name: 'CITIZEN ECO-DRIVE',
        price: 3000,
        quantity: Math.round(Math.random() * 100),
        image: 'https://reactnativestarter.com/demo/images/pexels-photo-167854.jpg',
    },
    {
        id: 10,
        name: 'NEW',
        price: 129.9,
        quantity: Math.round(Math.random() * 100),
        image: 'https://reactnativestarter.com/demo/images/pexels-photo-173427.jpg',
    },
    {
        id: 11,
        name: 'Office, prom or special parties is all dressed up',
        price: 29.99,
        quantity: Math.round(Math.random() * 100),
        image: 'https://reactnativestarter.com/demo/images/pexels-photo-175696.jpg',
    },
    {
        id: 12,
        name: 'Mad Perry',
        price: 29.99,
        quantity: Math.round(Math.random() * 100),
        image: 'https://reactnativestarter.com/demo/images/pexels-photo-175733.jpg',
    }
];
