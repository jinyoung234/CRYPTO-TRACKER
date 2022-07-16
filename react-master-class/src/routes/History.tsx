import ApexChart from "react-apexcharts";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "../utils/api";
import { isDarkAtom } from "../utils/atom";



interface chartInfo {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function History () {
    const urlData = useOutletContext<string>();
    const {isLoading, data} = useQuery<chartInfo[]>(["chartData", urlData], () => fetchCoinHistory(urlData), {
        refetchInterval: 5000,
    });

    const isDark = useRecoilValue(isDarkAtom);
    return (
        <>
            <Helmet>
                <title>Chart</title>
            </Helmet>
            <div>{isLoading ? "loading chart..." : 
                <ApexChart
                    type="candlestick" 
                    series={[
                        {
                          data: 
                            data?.map((price) => {
                              return [
                                Date.parse(price.time_close),
                                price.open,
                                price.high,
                                price.low,
                                price.close,
                              ];
                            }) as unknown as number[],
                        },
                      ]} 
                      options={{
                        theme: {
                          mode: isDark ? "dark" : "light",
                        },
                        chart: {
                          type: "candlestick",
                          height: 350,
                          width: 400,
                          toolbar: {
                            show:false,
                          },
                          background: "transparent",
                        },
                        stroke: {
                          curve: "smooth",
                          width: 3,
                        },
                        yaxis: {
                          show: false,
                        },
                        xaxis: {
                          type: "datetime",
                          categories: data?.map((price) => price.time_close),
                          labels: {
                            style: {
                              colors: '#9c88ff'
                            }
                          }
                        },
                        plotOptions: {
                          candlestick: {
                            colors: {
                              upward: '#3C90EB',
                              downward: '#DF7D46'
                            },
                            wick:{
                                useFillColor: true
                            }
                          }
                        }
                      }}
                />}
            </div>
        </>
    )
}

export default History;