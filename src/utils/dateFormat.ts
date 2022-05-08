// import { format } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';
import { pt } from 'date-fns/locale';

const pattern = "dd/LLLL/yyyy' às 'HH:mm'h'";

export const dateFormat = (date: string) => {
    return format(utcToZonedTime(new Date(date), 'America/Sao_Paulo'), pattern, { locale: pt });
};

export const dateFormatMonthYear = (date: string) => {
    return format(utcToZonedTime(new Date(date), 'America/Sao_Paulo'), "LLLL 'de' yyyy", { locale: pt });
}

export default dateFormat;
