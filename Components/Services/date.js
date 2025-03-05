const date = () => {
    let time = new Date();
    time.setUTCHours(time.getHours())
    let timeJsonStringfy = (JSON.stringify(time).replace("T"," ")).split(".")[0];
    let finishFormat = timeJsonStringfy.slice(1);
    return finishFormat;
}
export default date;