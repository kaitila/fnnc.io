import { timeSeriesDaily } from "@/alpha_api/timeSeriesDaily";
import { getHigh, getLow } from "@/alpha_api/utils";
import { Candle } from "@/components/Candle"

interface ChartProps {
    ticker: string,
    chartWidth?: number,
}

export const Chart = async ({ 
    ticker, chartWidth = 20
}: ChartProps) => {

    if (chartWidth < 0) {
        chartWidth = 0;
    }

    const stockData = await timeSeriesDaily({
        symbol: 'IBM',
        intervalCount: chartWidth,
    });

    let high = 100;
    let low = 0;

    if (stockData) {
        high = getHigh(stockData["Time Series (Daily)"]);
        low = getLow(stockData["Time Series (Daily)"]);
    }

    const delta = high - low;


    return (
        <>
            <div className="flex gap-0.5 h-28">
                {stockData ? stockData["Time Series (Daily)"].map((elem) => (
                    <Candle open={(Number(elem["1. open"]) - low) / delta * 100} close={(Number(elem["4. close"]) - low) / delta * 100} key={elem["6. date"]}/>
                )) : null}
            </div>
        </>
        
    )
}   