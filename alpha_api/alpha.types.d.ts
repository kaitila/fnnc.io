type ApiFunction = 'TIME_SERIES_INTRADAY' | 'TIME_SERIES_DAILY' | 'TIME_SERIES_WEEKLY' | 'GLOBAL_QUOTE';

interface ApiProps {
    symbol: string,
}

interface TimeSeriesInterval {
    '1. open': string,
    '2. high': string,
    '3. low': string,
    '4. close': string,    
}

interface DailyInterval extends TimeSeriesInterval {
    '5. volume': string,
    '6. date': string,
}

interface TimeSeriesMetaData {
        '1. Information': string,
        '2. Symbol': string,
        '3. Last Refreshed': string,
        '4. Output Size': string,
        '5. Time Zone': string,
}

interface TimeSeriesDaily {
    'Meta Data': TimeSeriesMetaData,
    'Time Series (Daily)': DailyInterval[],
}

interface GlobalQuote {
    '01. symbol': string,
    '02. open': string,
    '03. high': string,
    '04. low': string,
    '05. price': string,
    '06. volume': string,
    '07. latest trading day': string, 
    '08. previous close': string,
    '09. change': string,
    '10. change percent': string, 
}