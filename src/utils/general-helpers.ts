
export const existy = (x) : boolean => x != null;

export const isNumeric = (value: string) : boolean => /^-?\d+$/.test(value);

export const parseNumber = (data: string, defaultValue: number = Number.NaN): number => {
    if(existy(data)) {
        const value = parseInt(data, 10) || defaultValue;
        return value;
    }
    else {
        return defaultValue;
    }
};