interface CandleProps {
    open: number,
    close: number,
}

export const Candle = ({ open, close }: CandleProps) => {

    const negative = open > close;
    let height = close - open;
    if (negative) {
        height *= -1;
    }

    return (
        <div className="h-full w-2 flex flex-col">
            {negative ? 
                (
                    <>
                        <div style={{
                            height: `${100 - height - close}%`,
                        }}></div>
                        <div className="bg-red-400 w-full rounded-sm"
                            style={{
                                height: `${open - close}%`,
                            }}
                        ></div>
                    </>
                ):
                (
                    <>
                        <div style={{
                            height: `${100 - height - open}%`,
                        }}></div>
                        <div className="bg-green-400 w-full rounded-sm"
                            style={{
                                height: `${close - open}%`,
                            }}
                        ></div>
                    </>
                )   
            }
        </div>
    )
}