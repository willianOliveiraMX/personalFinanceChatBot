// import { format } from 'date-fns';
import { format } from 'date-fns-tz';
import { pt } from 'date-fns/locale';

const pattern = "dd/LLLL/yyyy' às 'HH:mm'h'"

export const dateFormat = (date: string) => {
    console.log("Date log: ", new Date(), date);
    return format(new Date(date), pattern, { timeZone: 'America/Sao_Paulo', locale: pt });
};

export const dateFormatMonthYear = (date: string) => {
    console.log("Date log: ", new Date(), date);
    return format(new Date(date), "LLLL 'de' yyyy", { timeZone: 'America/Sao_Paulo', locale: pt });
}

export default dateFormat;
