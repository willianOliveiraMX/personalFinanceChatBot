
interface currencyProps {
    value: number,
};

interface currencyStringProps {
    value: string;
};

export const currencyFormatIntToString = ({ value }: currencyProps): string => {
    if (!value) return '';

    const newValue = value / 100;
    return newValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
};

export const currencyFormatStringToInt = ({ value }: currencyStringProps): number => {
    var valueNumber = Number(value.replace(/[^0-9\-]+/g,""));

    return valueNumber;
};
