export const formatTime = (dateString) => {
  const date = new Date(dateString);
	const year = date.getFullYear();
	const month = date.toLocaleString('default', { month: 'long' });
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const ampm = hours >= 12 ? 'pm' : 'am';
	const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
	const formattedTime = `${formattedHours}:${minutes}${ampm}`;
	return `${month} ${day}, ${year} at ${formattedTime}`;
}