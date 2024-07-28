import { alpha } from "@/apis/alpha/Alpha";
import { timeSeriesDaily } from "./timeSeriesDaily";

export const getHigh = (arr: DailyInterval[]): number => {
    let high = 0;
    arr.map((e) => {
        if (Number(e["2. high"]) > high) {
            high = Number(e["2. high"]);
        }
    });

    return high;
}

export const getLow = (arr: DailyInterval[]): number => {
    let low = Number(arr[0]["3. low"]);

    arr.map((e) => {
        if (Number(e["3. low"]) < low) {
            low = Number(e["3. low"]);
        }
    })

    return low;
}
