import moment, { Moment } from "moment";
import { Day, IWeekDay } from "../components/timeTable.types";

export const generateWeekDays = (input: Moment | number) => {
  const days: IWeekDay[] = [];

  const startDay =
    typeof input !== "number"
      ? moment(input)
      : moment().add(input as number, "days");

  for (let i = 0; i < 7; i++) {
    days.push({
      dayName: startDay.format("dddd") as Day,
      dayDate: startDay.format("MMM DD"),
      fullDate: startDay.format("YYYY-MM-DD"),
    });
    startDay.add(1, "day");
  }
  return days;
};
