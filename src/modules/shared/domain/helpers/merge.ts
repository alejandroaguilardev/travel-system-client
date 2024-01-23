export function merge(object: any, ...otherArgs: any[]): any {
    const result: any = { ...object };

    otherArgs.forEach((obj) => {
        Object.keys(obj).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    result[key] = merge(result[key] || {}, obj[key]);
                } else {
                    result[key] = obj[key];
                }
            }
        });
    });

    return result;
}
