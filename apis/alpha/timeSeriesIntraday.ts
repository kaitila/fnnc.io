interface TimeSeriesDailyProps extends ApiProps {
    interval: '1min' | '5min' | '15min' | '30min' | '60min',
    outputSize?: 'compact' | 'full',
    dataType?: 'json' | 'csv',
}

export const timeSeriesIntraday = async ({ 
    symbol, interval, outputSize, dataType 
}: TimeSeriesDailyProps) => {

}