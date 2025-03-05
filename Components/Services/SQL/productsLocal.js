import AsyncStorage from "@react-native-async-storage/async-storage";
import { createProduct, createProductsTable, createUnit, createUnitsTable, deleteProducts, deleteUnits } from "../../Shared/Stage/products_sql";
import apiHeader from "../apiHeader";

const productsLocal = async (setText) => {

    setText("List yaranır...")

    await createProductsTable();
    setText("List yaradıldı!");

    setText("Məhsullar əlavə edilir...");
    const result = await apiHeader('pos/pos_getproducts.php', 'POST', {});
    const unitResult = await apiHeader('pos/pos_getproductunits.php', 'POST', {});
    const unitGroupsResult = await apiHeader('pos/pos_getunits.php', 'POST', {});

    let list = [...result.Body];
    let units = [...unitResult.Body];
    let productUnits = [...unitGroupsResult.Body];
    
    let sqliteUnits = []

    list.forEach(element => {
        let untId = element.UnitId == 0 ? 1 : element.UnitId;
        let unitInfoIndex = productUnits.findIndex(rel => rel.Id == untId);
        sqliteUnits.push({
            Id: productUnits[unitInfoIndex].Id,
            Ratio: "1",
            Name: productUnits[unitInfoIndex].Name,
            Title: productUnits[unitInfoIndex].Title,
            Price: element.Price,
            LinkId: element.Id,
        })

        let additionUnitIndex = units.findIndex(rel => rel.ProductId == element.Id);

        if (additionUnitIndex == -1) return;

        let additionUnitInfo = productUnits.findIndex(rel => rel.Id == units[additionUnitIndex].UnitId);


        sqliteUnits.push({
            Id: units[additionUnitIndex].UnitId,
            Ratio: units[additionUnitIndex].Ratio,
            Name: productUnits[additionUnitInfo].Name,
            Title: productUnits[additionUnitInfo].Title,
            Price: units[additionUnitIndex].Price,
            LinkId: units[additionUnitIndex].ProductId
        })

    })

    await deleteProducts();
    for (let index = 0; index < list.length; index++) {


        let status = await createProduct(list[index]);

        if (status !== 1) {
            console.error(`Failed to add product at index ${index}`);
        }
    }

    setText("Vahid növləri datası yaradılır...")
    await createUnitsTable();

    setText("Vahid növləri əlavə edilir....")
    await deleteUnits();
    for (let index = 0; index < sqliteUnits.length; index++) {

        let status = await createUnit(sqliteUnits[index]);
        if (status !== 1) {
            console.error(`Failed to add product at index ${index}`);
        }
    }

    setText("Hazırdır")
}

export default productsLocal