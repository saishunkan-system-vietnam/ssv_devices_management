export function formatMoney(money) {   
    if(!money){
        return "";
    }
    money = money.toString().replace(/,/g, '');
    if (money.length > 3) {
        let money_format = '';
        let dem = 0;
        for (let i = money.length - 1; i >= 0; i--) {
            if (dem === 3) {
                dem = 0;
                money_format = money[i] + "," + money_format;
            } else {
                money_format = money[i] + money_format;
            }
            dem++;
        }
        return money_format;
    }
    return money;
}