export function formatMessageTime(date) {
    const inputDate = new Date(date);
    const today = new Date();

    // Check if the input date is today
    const isToday =
        inputDate.getDate() === today.getDate() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getFullYear() === today.getFullYear();

    if (isToday) {
        return inputDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    } else {
        return `${inputDate.getDate()}/${inputDate.getMonth() + 1}/${String(inputDate.getFullYear()).slice(2)} ${inputDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })}`;
    }
}