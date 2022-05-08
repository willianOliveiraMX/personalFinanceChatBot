import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { pt } from 'date-fns/locale';

const pattern = "d/LLLL/yyyy' às 'HH:mm'h'"

export const dateFormat = (date: string) => {
    const utcDate = zonedTimeToUtc(new Date(date), 'America/Sao_Paulo');

    return format(new Date(utcDate), pattern, { locale: pt });
};

export const dateFormatMonthYear = (date: string) => {
    const utcDate = zonedTimeToUtc(new Date(date), 'America/Sao_Paulo');

    return format(new Date(utcDate), "LLLL 'de' yyyy", { locale: pt });
}

export default dateFormat;
