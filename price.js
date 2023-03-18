const axios = require('axios');
const TelegramBot = require("node-telegram-bot-api")
const bot = new TelegramBot('5943277085:AAFnP1z1mZWjv5MAKk6RoNYq8-CEOJRRcug', {polling: true});
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



class dataBuy {
    constructor() {
        this.priceto = null;
        this.currency = null;
        this.propertyIds = null;
        this.cookie = null;
        this.address = null;

        this.saleId = null;
        this.idmarket = null;
        this.sessionKey = null;
        this.stopflag = null;

    }

    stoped() {
        this.stopflag = true;
    }

    async price() {
        while (!this.stopflag) {
            try {
                const response = await axios.get(`https://citizen.store.dosi.world/api/stores/v1/dosi/market/nfts`, {
                    params: {
                        'pageNo': '1',
                        'propertyIds': this.propertyIds,
                        'category': '',
                        'currency': this.currency,
                        'nftOrder': 'PRICE_ASC',
                        'priceTo': this.priceto
                    },
                    headers: {
                        'authority': 'citizen.store.dosi.world',
                        'accept': '*/*',
                        'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                        // 'cookie': 'ZPS=%7B%22state%22%3A%7B%7D%2C%22version%22%3A0%7D; DSSCC=all; DOSI_SES=BIVcsV7mflQ6vyztVTTl+tRBSqTvMMMhQPyjbIo9uy0NrkuqsYSM/18xEahr3LBaay7WydOq43xCKr+q+eSqpr7SYQC++pO0NV/JyJZkDqtjaKorAHE+oF63nNGn9TpxZSj5Q/j7w4FtfsuSm3clT0+/IIz4cC0HaGfiklBCzDZ0XC9NvR0nCUeoBKU7BXgL1cYcjKr/Cu4YvI6HYQmK8bAVPHa9X7oquAXXJ5+gVTUjJW1Qu29+z19iVJevajwolckfa2+obI1ahIPvit7HgmvaORRJXANPVQlnaWQOJPaGF9s9Q/+TUyZnvR6GzO2roai19jB1SE+1KfRM97PnkTW72rj5UTF3vNJN6FlAEq0=',
                        'referer': 'https://citizen.store.dosi.world/marketplace?pageNo=1&propertyIds=1523913&category=&currency=LN&nftOrder=PRICE_ASC',
                        'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                        'x-nextjs-data': '1'
                    }
                });
                if (response.data.responseData.content[0]) {
                    const saleId = response.data.responseData.content[0].saleId
                    const idmarket = response.data.responseData.content[0].id
                    this.saleId = saleId
                    this.idmarket = idmarket
                    return [saleId,idmarket]
                } else {
                    continue
                }
            } catch (error) {
                continue
            }

        }
    }

    async session() {
        if (this.stopflag) {
            return
        }
        await this.price()
        try {
            const res = await axios.post(
                `https://citizen.store.dosi.world/api/stores/v2/payment/market/${this.saleId}`,
                {
                    'currency': this.currency,
                    'callbackUrl': {
                        'onApprovedUrl': 'https://citizen.store.dosi.world/id-ID/purchase/approveC2CPurchase',
                        'cancelUrl': 'https://citizen.store.dosi.world/purchase/cancelPurchase'
                    }
                },
                {
                    headers: {
                        'authority': 'citizen.store.dosi.world',
                        'accept': 'application/json',
                        'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                        'content-type': 'application/json',
                        'cookie': this.cookie,
                        'origin': 'https://citizen.store.dosi.world',
                        'referer': 'https://citizen.store.dosi.world/nfts/2825825',
                        'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
                    }
                }
            );
            const response = await axios.post(
                `https://wallet.dosi.world/api/v1/payments/crypto/${res.data.responseData.paymentId}/session`,
                {
                    'currentIpCountryCodeAlpha2': 'ID'
                },
                {
                    headers: {
                        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                        'Connection': 'keep-alive',
                        'Cookie': this.cookie,
                        'Origin': 'https://wallet.dosi.world',
                        'Referer': 'https://wallet.dosi.world/purchase/crypto-ln/9917c6e5-e276-4de9-b740-94acc028a378',
                        'Sec-Fetch-Dest': 'empty',
                        'Sec-Fetch-Mode': 'cors',
                        'Sec-Fetch-Site': 'same-origin',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                        'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"',
                        'sentry-trace': '09910dd8160143ba8b3f185be0f3c868-980850be0ff82854-0'
                    }
                }
            );
            if (response.data.responseData) {
                this.sessionKey = response.data.responseData.sessionKey
            } else {
                return 'locked'
            }
        } catch (e) {
            return this.session()
        }
    }

    async start() {
        if (this.stopflag) {
            this.stopflag = true
            return 'stop'
        }
        const ses = await this.session()
        if (ses == 'locked') {
            return 'locked'
        } else {
            try {
                const start = await axios.post(
                    `https://wallet.dosi.world/api/v1/payments/crypto/${this.sessionKey}/start`,
                    {
                      'buyerCryptoWalletAddress': this.address,
                      'billingAddress': 'ID',
                      'currentBlockNumber': 16848067
                    },
                    {
                      headers: {
                        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                        'Connection': 'keep-alive',
                        'Cookie': this.cookie,
                        'Origin': 'https://wallet.dosi.world',
                        'Referer': 'https://wallet.dosi.world/purchase/crypto/6e32c7a3-f0e5-4f66-833b-fffe7eef2a4f',
                        'Sec-Fetch-Dest': 'empty',
                        'Sec-Fetch-Mode': 'cors',
                        'Sec-Fetch-Site': 'same-origin',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                        'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"'
                      }
                    }
                  );
                if(start.data.responseCode == '695') {
                    return null
                } else {
                    return start.data.responseData.status
                }
            } catch (e) {
                return this.start()
            }
        }
    }

    async status() {
        try {
            const response = await axios.get(`https://wallet.dosi.world/api/v1/payments/crypto/session/${this.sessionKey}/payment-status`, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Connection': 'keep-alive',
                    'Cookie': this.cookie,
                    'Referer': 'https://wallet.dosi.world/purchase/crypto-ln/c8ee5206-bcee-491c-a1ce-3ba47b3d87a1',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                    'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"'
                }
            });
            return response.data.responseData;
        } catch (e) {
            return this.status()
        }
    }

    async stop() {
        try {
            const response = await axios.delete(`https://wallet.dosi.world/api/v1/payments/crypto/${this.sessionKey}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                'Connection': 'keep-alive',
                'Cookie': this.cookie,
                'Origin': 'https://wallet.dosi.world',
                'Referer': 'https://wallet.dosi.world/purchase/crypto/33c53fb4-b54c-472f-b756-a0e67e9d1aaa',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; ASUS_I005D) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
                'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"'
            }
            });
            return response.data.responseData.status
        } catch (e) {
            return
        }
    }
}

class dataBot {
    constructor(chatId) {
        this.chatId = chatId;
        this.messange = null
    }

    home() {
        bot.sendMessage(this.chatId, 'Menu',{
            reply_markup: {
                resize_keyboard: true,
                keyboard: [[{ text: 'Beli'}]]
            }
        });
    }

    async botone() {
        const response = await new Promise((resolve, reject) => {
            bot.once('message', (msg) => {
                resolve(msg)
            })
        })
        if (response.text) {
            this.messange = response.text
        }
        return response
    }

    beli() {
        bot.sendMessage(this.chatId, 'Masukan Tipe',{
            reply_markup: {
                resize_keyboard: true,
                keyboard: [[{ text: 'ETH' },{ text: 'LN' }],[{ text: 'HOME'}]],
            }
        });
    }

    async priceuser(currency) {
        bot.sendMessage(this.chatId, `Masukan Harga ${currency}`,{
            reply_markup: {
                resize_keyboard: true,
                keyboard: [['BACK']],
            }
        });
        await this.botone()
        return this.messange
    }

    async cookie() {
        bot.sendMessage(this.chatId, 'Masukan Cookie',{
            reply_markup: {
                resize_keyboard: true,
                keyboard: [['BACK']],
            }
        });
        await this.botone()
        return this.messange
    }
}


const buy = new dataBuy();


bot.onText(/\/start/, async (msg) => {
    const methode = new dataBot(msg.chat.id)
    methode.home()
});

async function refrash(chatid) {
    bot.sendMessage(chatid, 'Wait....')
    const start = await buy.start()
    if (start == 'STARTED') {
        bot.sendMessage(chatid, `STARTED https://citizen.store.dosi.world/en-US/nfts/${buy.idmarket}`,{
            reply_markup: {
                resize_keyboard: true,
                keyboard: [[{ text: 'REFRASH'}], [{ text: 'STOP'}]],
            }
        })
    } else if (start == 'locked') {
        bot.sendMessage(chatid, 'wallet ke kunci',{
            reply_markup: {
                resize_keyboard: true,
                keyboard: [[{ text: 'REFRASH'}], [{ text: 'STOP'}]],
            }
        })
    } else {
        bot.sendMessage(chatid, 'NFT Dalam proses pembayaran')
    }

}

bot.on('message', async (msg) => {
    const methode = new dataBot(msg.chat.id)
    const chatid = msg.chat.id;
    const message = msg.text;

    
    if (message == 'Beli') {
        methode.beli()
    }
    if (message == 'ETH') {
        async function beli() {
            buy.stopflag = false
            const price = await methode.priceuser('ETH')
            if (isNaN(price)) {
                if (price == 'BACK') {
                    methode.beli()
                    return
                } else {
                    bot.sendMessage(chatid, 'Harga harus angka')
                    methode.beli()
                    return
                }
            }
            const cookie = await methode.cookie()
            if (cookie == 'BACK') {
                methode.beli()
                return
            }
            buy.priceto = price
            buy.cookie = cookie
            buy.propertyIds = ''
            buy.currency = 'ETH'
            buy.address = '0x1e1af2aaf5EbBD5F57B47a187122A626FcE4eC16'
            return refrash(chatid)
        }
        beli()
        return
    }
    if (message == 'LN') {
        async function beli() {
            buy.stopflag = false
            const price = await methode.priceuser('LN')
            if (isNaN(price)) {
                if (price == 'BACK') {
                    methode.beli()
                    return
                } else {
                    bot.sendMessage(chatid, 'Harga harus angka')
                    methode.beli()
                    return
                }
            }
            const cookie = await methode.cookie()
            if (cookie == 'BACK') {
                methode.beli()
                return
            }
            buy.priceto = price
            buy.cookie = cookie
            buy.propertyIds = ''
            buy.currency = 'LN'
            buy.address = 'link180sayalxm8rg9kgztef9guhh0d4annkj8m92nx'
            return refrash(chatid)
        }
        beli()
        return
    }
    if (message == 'CANCEL') {
        buy.stoped()
        bot.sendMessage(chatid, 'CANCELED',{
            reply_markup: {
                resize_keyboard: true,
                keyboard: [[{ text: 'ETH' }], [{ text: 'LN' }]]
            }
        })
        return
    }
    if (message == 'REFRASH') {
        buy.stop()
        refrash(chatid)
        return
    }
    if (message == 'STOP') {
        buy.stop()
        bot.sendMessage(chatid, 'STOPED',{
            reply_markup: {
                resize_keyboard: true,
                keyboard: [[{ text: 'ETH' },{ text: 'LN' }],[{ text: 'HOME'}]],
            }
        })
    }
    if (message == 'HOME') {
        methode.home()
    }

});

