import { useCallback } from 'react';

// Type definition for the key mapping
type KeyMapping = { [key: string]: string };

/**
 * Custom hook to transform object keys based on a provided key mapping.
 */
const useTransformKeys = <T extends Record<string, any>>() => {
    /**
     * Transforms the keys of an object or an array of objects based on the given key mapping.
     * @param data - The object or array of objects to transform.
     * @param keyMapping - The mapping of old keys to new keys.
     * @returns The transformed object or array of objects.
     */
    const transformKeys = useCallback(
        (data: T | T[], keyMapping: KeyMapping): T | T[] => {
            if (Array.isArray(data)) {
                // If the data is an array, map over each item and transform its keys
                return data.map((item) => transformKeys(item, keyMapping) as T);
            } else {
                const result: Partial<Record<string, any>> = {};
                for (const [oldKey, newKey] of Object.entries(keyMapping)) {
                    if ((data as Record<string, any>)?.[oldKey] !== undefined) {
                        result[newKey] = (data as Record<string, any>)[oldKey];
                    }
                }
                return result as T;
            }
        },
        []
    );

    return { transformKeys };
};

export default useTransformKeys;

