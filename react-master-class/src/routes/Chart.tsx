import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../utils/api";
import Price from "./Price";

interface ICoinHistory {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface chartInfo {
    time_open: Date;
    time_close: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart () {
    const urlData = useOutletContext<string>();
    const {isLoading, data} = useQuery<chartInfo[]>(["chartData", urlData], () => fetchCoinHistory(urlData));
    return (
       <div>{isLoading ? "loading chart..." : 
            <ApexChart
                type="line" 
                options={{
                    chart:{
                        height:500,
                        width:500,
                        toolbar:{
                            show:false
                        },
                        background: "transparent",
                    },
                    stroke:{
                        curve:"smooth"
                    },
                    grid:{
                        show:false
                    },
                    theme:{
                        mode:"dark"
                    },
                    yaxis:{
                        show:false
                    },
                    xaxis:{
                        axisBorder:{show:false},
                        axisTicks:{show:false},
                        type:"category",
                        labels:{
                            datetimeFormatter: {
                                year: 'yyyy',
                                month:"MMM 'yy",
                            },
                            show:false
                        },
                        categories: data?.map(price => (new Date(price.time_close)) ?? []),
                    },
                    fill: {
                        type:"gradient",
                        gradient:{gradientToColors:["blue"], stops:[0,100]},
                    },
                    colors:["red"],
                    tooltip:{
                        y: {
                            formatter: (value) => `${value.toFixed(2)}`,
                        }
                    }
                }}
                series={[{
                    name: "price",
                    data: data?.map(price => price.close) ?? [],
                }]}
            />}
        </div>
    )
}

export default Chart;