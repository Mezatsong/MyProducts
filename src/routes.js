import ListScreen from './Screen/List/List.screen';
import AddScreen from './Screen/Add/Add.screen';
import SettingsScreen from './Screen/Settings/Settings.screen';


export default [
    {
        name: 'Settings',
        title: 'Paramètres',
        screen: SettingsScreen,
        icon: 'gear'
    },{
        name: 'List',
        title: 'Liste des produits',
        screen: ListScreen,
        icon: 'product-hunt',
    },
    {
        name: 'Add',
        title: 'Ajouter un produit',
        screen: AddScreen,
        icon: 'plus'
    }, 
    {
        name: 'Share',
        title: 'Partager les produits',
        screen: AddScreen,
        icon: 'share-alt'
    },
    
];