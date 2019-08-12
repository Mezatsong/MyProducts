import ListScreen from './screens/list/List.screen';
import AddScreen from './screens/add/Add.screen';
import SettingsScreen from './screens/settings/Settings.screen';


export default [
    {
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
    {
        name: 'Settings',
        title: 'Paramètres',
        screen: SettingsScreen,
        icon: 'gear'
    }
];