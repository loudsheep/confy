import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(initialValue);

    const saveValue = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
        setValue(value);
    }

    useEffect(() => {
        let storedValue = localStorage.getItem(key);

        if (storedValue == null) {
            setValue(initialValue);
        } else {
            setValue(JSON.parse(storedValue));
        }
    }, []);

    return [
        value,
        saveValue
    ];
}