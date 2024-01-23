type AnyObject = { [key: string]: any };

export function isEqual(objA: AnyObject, objB: AnyObject): boolean {
    if (objA == null && objB == null) {
        return true;
    }

    if (objA == null || objB == null) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length || !keysA.every(key => keysB.includes(key))) {
        return false;
    }

    return keysA.every(key => {
        const valueA = objA[key];
        const valueB = objB[key];

        if (typeof valueA === 'object' && typeof valueB === 'object') {
            return isEqual(valueA, valueB);
        }
        return valueA === valueB;
    });
}

