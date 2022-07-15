import ApexChart from "react-apexcharts";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchPriceData } from "../utils/api";
import { Theme } from "../utils/theme";

interface CoinPriceData {
    id : string;
    name : string;
    symbol : string;
    rank : number;
    circulating_supply : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated : string;
    quotes : {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h:number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h:number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number; 
        }
    };
}

function Price () {

    // urlData 가져오기
    const urlData = useOutletContext<string>();

    // priceData useQuery로 가져오기
    const {isLoading, data} 
    = useQuery<CoinPriceData>(["priceInfo", urlData], () => fetchPriceData(urlData!));
    return (
        <>
            <Helmet>
                <title>{urlData + "Price"}</title>
            </Helmet>
            <ApexChart
                type="line"
                
                options={{
                    theme: {
                        mode:"dark",
                    },
                    chart:{
                        height: 400,
                        width: 400,
                        type: "line",
                        toolbar: {
                            show:false
                        },
                        background:"transparent"
                    },
                    fill:{
                        type:"gradient",
                        gradient: {
                            gradientToColors: [Theme.accentColor],
                            stops: [0,100]
                        },
                        colors: [Theme.bgColor],
                    }, 
                    xaxis: {
                        type:'category',
                        categories: ["15m", "30m", "1h", "6h", "12h", "24h"],
                        axisTicks:{
                            show:false,
                        },
                        axisBorder:{
                            show:false
                        },
                        labels:{
                            show:false
                        },
                    },
                    yaxis:{
                        labels:{
                            show:false
                        },
                    },
                    grid: {
                        show:false
                    },
                }}
                series={
                    [
                        {
                            name: "percent_change",
                            data: [
                                data?.quotes.USD.percent_change_15m,
                                data?.quotes.USD.percent_change_30m,
                                data?.quotes.USD.percent_change_1h,
                                data?.quotes.USD.percent_change_6h,
                                data?.quotes.USD.percent_change_12h,
                                data?.quotes.USD.percent_change_24h,      
                            ] as number[]
                        }
                    ]
                }
            />            
        </>
    )
}

export default Price;