import { alpha } from "@/apis/alpha/Alpha";
import { apiCall } from "@/apis/alpha/apiCall";

interface GlobalQuoteProps extends ApiProps {
    dataType?: 'json' | 'csv',
}

export const globalQuote = async ({
    symbol, dataType
}: GlobalQuoteProps) => {
    const apiKey = alpha.apiKey;
    const endpoint = `function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}${dataType ? `&datatype=${dataType}` : ''}`;
    const data = await apiCall(endpoint);

    if ('Information' in data) {
        console.error(data['Information']);
        return null;
    }

    const res: GlobalQuote = data['Global Quote'];
    return res;
}