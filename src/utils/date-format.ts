import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (dateString: string): string => {
	const date = parseISO(dateString);
	const time = format(date, 'HH:mm', { locale: ru });

	if (isToday(date)) {
		return `Сегодня, ${time}`;
	} else if (isYesterday(date)) {
		return `Вчера, ${time}`;
	} else {
		const daysAgo = formatDistanceToNow(date, { locale: ru, addSuffix: true });
		return `${daysAgo}, ${time}`;
	}
};