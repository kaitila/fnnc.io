'use client';

import { LuDot } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { getPriceQuote } from "@/apis/methods/getPriceQuote";
import { useEffect, useState } from "react";

export interface StockViewMininalProps {
    className?: string | undefined,
    name: string,    
    exchange: string,
    ticker: string,
}

export const StockViewMedium = ({
    className,
    name,
    exchange,
    ticker,
}: StockViewMininalProps) => {

    const [ data, setData ] = useState({price: 0, changeP: 0});
    const [ pending, setPending ] = useState(false);

    useEffect(() => {
        setPending(true);
        getPriceQuote(ticker)
            .then(({ price, changeP }) => setData({price: price, changeP: changeP}))
            .then(() => setPending(false));
    }, [])

    const price = data.price.toFixed(2);
    const changeP = data.changeP.toFixed(2);

    return (
        <div className={`shadow-sm border-primary border rounded-xl col-span-1 ${ className }`}>
            <div className="p-3 flex items-center justify-between h-full gap-12">
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <h2 className="font-bold text-2xl">{name}</h2>
                        <h3 className="font-semibold text-light text-xl mb-2">{ticker}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                        <p className="font-semibold text-base text-primary">{exchange}</p>
                        <LuDot className="text-xl text-light"/>
                        <p className="text-closed font-semibold text-sm">closed</p>
                    </div>
                </div>
                <div className="transition-all duration-300">
                    {pending ? 
                        <>
                            <div className="rounded-md loading-animation h-8 w-16 mb-2"></div>
                            <div className="rounded-md loading-animation h-5 w-16 mb-2"></div>
                        </> : 
                    (
                        <>
                            <h2 className="text-3xl font-semibold">{price.slice(0, -3)}<span className="text-light text-lg">{price.slice(-3)}</span></h2>
                            <h3 className="text-lg font-semibold text-green-500 text-nowrap"><IoMdArrowDropup className="inline"/>{changeP}%</h3>
                        </>
                    )}
                </div>
                
                

            </div>
        </div>
    )
}