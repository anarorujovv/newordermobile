import SQLite from 'react-native-sqlite-storage';

const database_name = "pos";
const database_version = "1.0";
const database_displayname = "pos list";
const database_size = 50 * 1024 * 1024;

const dataBase = async () => {
    return await SQLite.openDatabase(database_name, database_version, database_displayname, database_size)
}

export default dataBase