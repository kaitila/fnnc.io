import { apiCall } from "@/alpha_api/apiCall";
import { alpha } from "@/alpha_api/Alpha";

interface TimeSeriesDailyProps extends ApiProps {
    intervalCount?: number,
    outputSize?: 'compact' | 'full',
    dataType?: 'json' | 'csv',
}

export const timeSeriesDaily = async ({ 
    symbol, intervalCount = 100000, outputSize, dataType
}: TimeSeriesDailyProps) => {
    if (intervalCount < 1) {
        intervalCount = 1;
    }

    const apiKey = alpha.apiKey;

    const endpoint = `function=TIME_SERIES_DAILY&symbol=${symbol}${outputSize ? `&outputsize=${outputSize}` : ''}&apikey=${apiKey}${dataType ? `&datatype=${dataType}` : ''}`;
    const data = await apiCall(endpoint);

    if ('Information' in data) {
        console.error(data['Information']);
        return null;
    } 

    let arr: DailyInterval[] = [];
    const timeSeries = data['Time Series (Daily)'];

    Object.keys(timeSeries)
        .slice(0, intervalCount)
        .map((key) => {
            timeSeries[key]['6. date'] = key;
            arr.unshift(timeSeries[key]);
    });

    const res: TimeSeriesDaily = {
        'Meta Data': data['Meta Data'],
        'Time Series (Daily)': arr,
    }

    return res;
}