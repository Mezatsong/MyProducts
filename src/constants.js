export const APP_NAME = 'MyProducts';   //without space

const APP_PREFIX = 'ben.descartesmomapp.' + APP_NAME + '.';
const SETTING_PREFIX =  APP_PREFIX + 'settings.';

export const STORAGE_PRODUCTS_KEY = APP_PREFIX + 'products';

export const SETTINGS_STORAGE_TYPE_KEY = SETTING_PREFIX + 'storage_type';
export const SETTINGS_STORAGE_TYPE_VALUE_REMOTE = 'Distant';
export const SETTINGS_STORAGE_TYPE_VALUE_LOCAL = 'Local';

export const SETTINGS_STORAGE_END_POINT_KEY = SETTING_PREFIX + 'endpoint';

export const SETTINGS_USERNAME_KEY = SETTING_PREFIX + 'username';
export const SETTINGS_USERNAME_DEFAULT_VALUE = "set username in setting";

export const SETTINGS_NBR_COLUMN_KEY = SETTING_PREFIX + 'nbr_column_to_display';

export const SETTINGS_HIDE_NULL_QTE = SETTING_PREFIX + 'hide_null_qte';