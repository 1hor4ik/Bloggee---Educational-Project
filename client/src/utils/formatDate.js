import { format, isValid, parseISO } from "date-fns";

export const formatDate = (date) => {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsedDate)) {
    return "Invalid date";
  }
  return format(parsedDate, "PP");
};
