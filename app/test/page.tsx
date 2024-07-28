import { getPriceQuote } from '@/apis/methods/getPriceQuote';
import { SearchContainer } from '@/components/SearchContainer';
import { StockViewMinimal } from '@/components/StockViewMinimal';

const TestPage = async () => {
    console.log(await getPriceQuote('AAPL'));
    return (
        <div className='p-40'>
            
        </div>
    );
}

export default TestPage;