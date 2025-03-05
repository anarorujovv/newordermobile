import { ConvertFixedTable } from "./convertFiexTabel";

const allSumReport = (items) => {
    let list = [...items];
    let sum = 0;
    for (let index = 0; index < list.length; index++) {
        sum += ConvertFixedTable(list[index].Price) * String(list[index].quantity);
    }

    return sum;
}

export default allSumReport;