'use client';

import { useSearchParams } from "next/navigation";
import { ResultsContainer } from "@/components/ResultsContainer";

export default function SearchPage() {
    const query = useSearchParams().get('query');

    return (
        <div className="max-w-240 mx-auto">
            <p className="w-fit mx-auto text-light">Showing results for: {query}</p>
            <ResultsContainer query={query}/>
        </div>
    );
}