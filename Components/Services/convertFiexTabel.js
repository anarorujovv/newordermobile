export function ConvertFixedTable(num) {
    var isNum = !isNaN(parseFloat(num));
    return isNum
        ? parseFloat(parseFloat(parseFloat(num).toFixed(2)))
        : "";
}