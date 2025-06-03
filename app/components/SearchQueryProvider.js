'use client';

import { useSearchParams } from "next/navigation";

export default function SearchQueryProvider({ children }) {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    return children(searchQuery);
}