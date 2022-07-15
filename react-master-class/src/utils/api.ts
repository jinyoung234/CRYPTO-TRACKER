import axios from "axios";

const BaseURL = "https://api.coinpaprika.com/v1/"

// fetcher function
export async function fetchCoins() {
    const res =  await axios.get(BaseURL+"coins");
    return res.data;
}

export async function fetchCoinData(coinId : string) {
    const res = await axios.get(BaseURL+`coins/${coinId}`)
    return res.data;
}

export async function fetchPriceData(coinId : string) {
    const res = await axios.get(BaseURL+`tickers/${coinId}`);
    return res.data;
}

export async function fetchCoinHistory(urlData : string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24;
    const res =  await axios.get(BaseURL+`coins/${urlData}/ohlcv/historical?start=${startDate}&end=${endDate}`);
    return res.data;
    
}
