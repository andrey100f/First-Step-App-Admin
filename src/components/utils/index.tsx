export function formatDate(dataInput: string): string {
    const dataObj = new Date(dataInput.replace("Z", "+00:00"));

    const year = dataObj.getFullYear();
    const month = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    let day = "";

    if(dataObj.getDate().toString().length == 1) {
        day = `0${dataObj.getDate().toString()}`;
    }
    else {
        day = dataObj.getDate().toString();
    }

    return `${year}-${month}-${day}`;
}