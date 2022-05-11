// import { format } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';
import { pt } from 'date-fns/locale';

export const dateFormat = (date: string) => {
    const pattern = "dd/LLLL/yyyy' às 'HH:mm'h'";

    return format(utcToZonedTime(new Date(date), 'America/Sao_Paulo'), pattern, { locale: pt });
};

export const dateFormatMonthYear = (date: string) => {
    const pattern = "LLLL 'de' yyyy";

    return format(utcToZonedTime(new Date(date), 'America/Sao_Paulo'), pattern, { locale: pt });
}

export default dateFormat;
