// This function returns the current date and time in local ISO format (YYYY-MM-DDTHH:MM).
export const getLocalISODateTime = (): string => {
  const now = new Date();
  const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16); // Format: YYYY-MM-DDTHH:MM
  return localISOTime;
};

// This function returns the current date to Custom format(DD-MM-YYYY)
export function formatDateToCustom(dateInput: string | Date): string {
  const date = new Date(dateInput);
  const day = date.getDate().toString().padStart(2, "0");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
