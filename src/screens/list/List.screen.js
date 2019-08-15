import React, { Component } from 'react';
import {Text, View, FlatList} from 'react-native';
import {styles} from './List.style';
import {colors} from '../../style';
import CheckAlert from 'react-native-awesome-alert';
import UpdateItemAlert from '../../components/UpdateItemAlert';
import SingleColumnItem from '../../components/SingleColumnItem';
import MultipleColumnItem from '../../components/MutlipleColumnItem';
import CustomHeader from '../../components/CustomHeader';
import {
    loadChunk, 
    loadHideNullQte,
    loadProducts,
    removeProduct,
    updateProduct
} from '../../redux/actions';
import { getProductByFilter } from '../../redux/selectors';
import { connect } from "react-redux";

class ListScreen extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    UNSAFE_componentWillMount() {
        this.props.loadChunk();
        this.props.loadHideNullQte();
        this.props.loadProducts();
    }


    onItemTouched = (item) => {
        this.setState({value:item.quantity});
        this.checkAlert.alert(
            `Mettre à jour le stock (${item.name})`,
            <UpdateItemAlert 
                value={item.quantity}
                onChange={value => this.setState({value})}
            ></UpdateItemAlert>,
            [{
                text: "OK",
                onPress: () => {
                    this.props.updateProduct({
                        ...item,
                        quantity: this.state.value
                    });
                },
                id: "UpdateAlert"
            },
            {
                text: "Annuler",
                onPress: () => null
            }]
        );
    };


    onDelete = (item) => {
        this.props.removeProduct(item.id);
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


    renderItem = row => (this.props.chunk == 1) ? this.renderItemSingleColumn(row) : this.renderItemMutlipleColumn(row);

    listEmpty = () => {
        return (
            //View to show when list is empty
            <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>
                    {this.props.products == null ? "Chargement...":"Aucun produit trouvé !"}
                </Text>
            </View>
        );
    }

    render() {
        const listData = this.props.products || [];
        const chunk = this.props.chunk;
        let data = [];
        if (chunk == 2)
            for (let i = 0, j = listData.length; i < j; i += chunk) {
                data.push(listData.slice(i, i + chunk));
            }
        else
            data = listData;
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
                    keyExtractor={rowOrItem => rowOrItem.id ? rowOrItem.id : rowOrItem[0].id }
                    style={{ backgroundColor: colors.white, paddingHorizontal: 15 }}
                    data={data}
                    renderItem = {this.renderItem}
                    ListEmptyComponent={this.listEmpty}
                />
            </View>
        );
    } 

}


const mapStateToProps = state => {
    const products = getProductByFilter(state);
    const { chunk } = state;
    return {
        products,
        chunk
    };
};

export default connect(mapStateToProps, {
    loadProducts,
    removeProduct,
    updateProduct,
    loadHideNullQte,
    loadChunk
})(ListScreen);
