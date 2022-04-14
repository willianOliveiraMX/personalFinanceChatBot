import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

const pattern = "d/LLLL/yyyy' às 'HH:mm'h'"

export const dateFormat = (date: string) => {
    return format(new Date(date), pattern, { locale: pt });
};

export const dateFormatMonthYear = (date: string) => {
    return format(new Date(date), "LLLL 'de' yyyy", { locale: pt });
}

export default dateFormat;
