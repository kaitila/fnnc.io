import { LuDot } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";

export interface StockViewMininalProps {
    className?: string | undefined,
    name: string,
    exchange: string,
    ticker: string,
}

export const StockViewMinimal = ({
    className,
    name,
    exchange,
    ticker,
}: StockViewMininalProps) => {
    return (
        <div className={`min-w-72 ${ className }`}>
            <div className="p-2 flex items-center justify-between gap-8">
                <div>
                    <h3 className="font-bold text-xl">{name}</h3>
                    <h4 className="font-semibold text-light text-base">{ticker}</h4>
                </div>
                <div className="flex items-center gap-1">
                    <p className="font-semibold text-base text-primary">{exchange}</p>
                    <LuDot className="text-xl text-light"/>
                    <p className="text-closed font-semibold text-sm">closed</p>
                    <IoIosArrowForward className="text-4xl text-light"/>
                </div>

            </div>
        </div>
    )
}