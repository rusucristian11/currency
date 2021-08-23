export default class CardInfo {
    flag = ''
    sign = ''
    value = ''
    short = ''
    long = ''
    from = ''
    to = ''
    main = ''
    exchange = 0

    constructor(flag = null, sign = null, value = null, short = null, long = null, from = null, to = null, main = null, exchange = null){
        this.flag = flag;
        this.sign = sign;
        this.value = value;
        this.short = short;
        this.long = long;
        this.from = from;
        this.to = to;
        this.main = main;
        this.exchange = exchange
    }
}
