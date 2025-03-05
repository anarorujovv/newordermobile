import moment from 'moment-timezone';
import apiHeader from '../apiHeader';
import { createDemand, createDemandItems, createDemandItemsTable, createDemandsTable, deleteDemandItems, deleteDemands } from '../../Shared/Stage/demands_sql';
import AsyncStorage from '@react-native-async-storage/async-storage';
const demandsLocal = async (settext) => {

    settext("Satışlar əlavə edilir...");

    let currentDate = new Date();

    currentDate.setMonth(currentDate.getMonth() - 1);

    const createdDemandResponse = await createDemandsTable();
    const createdDemandItemResponse = await createDemandItemsTable();

    if (createdDemandResponse == 1 && createdDemandItemResponse == 1) {

        let date = moment(currentDate).format("YYYY-MM-DD hh:mm:ss");
        let obj = {
            FromDate: date
        }
        await AsyncStorage.setItem("demandDate",obj.FromDate);
        await deleteDemands();
        await deleteDemandItems();
        const result = await apiHeader('pos/pos_sync_sales.php', 'POST', obj);
        let list = [...result.Body];
        for (let index = 0; index < list.length; index++) {
            await createDemand(list[index]);
            for (let itemIndex = 0; itemIndex < list[index].Items.length; itemIndex++) {
                await createDemandItems(list[index].Items[itemIndex],list[index].Id);

            }
        }
        settext("Satışlar yükləni")

    }
}
export default demandsLocal;