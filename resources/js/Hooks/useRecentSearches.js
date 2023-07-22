import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useRecentSearches(maxLength = 10) {
    const [recent, setRecent] = useLocalStorage('recentSearches', []);

    // TODO check for array repetition
    const addRecent = (value) => {
        let r = recent;
        if (recent.length >= maxLength) {
            console.log("MORE");
            r.pop();
        }
        r = [value, ...r];

        setRecent(r);
    }
 
    return [
        recent,
        addRecent
    ];
}