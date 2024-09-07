import { Moment } from "moment";
import { CSSProperties } from "react";

export type TimeSlot = "morning" | "afternoon" | "evening";
export type IDate = { day: IWeekDay; time: string; timestamp: string };
export type Day =
   | "saturday"
   | "sunday"
   | "monday"
   | "tuesday"
   | "wednesday"
   | "thursday"
   | "friday";
export type IWeekDay = {
   dayName: Day;
   dayDate: string;
   fullDate: string;
};

export type AvailabilityStatus =
   | "fully-available"
   | "partially-available"
   | "not-available";

export interface Availability {
   day: Day;
   timeSlot: TimeSlot;
   status: AvailabilityStatus;
}

export type IHour =
   | "1"
   | "2"
   | "3"
   | "4"
   | "5"
   | "6"
   | "7"
   | "8"
   | "9"
   | "10"
   | "11"
   | "12"
   | "13"
   | "14"
   | "15"
   | "16"
   | "17"
   | "18"
   | "19"
   | "20"
   | "21"
   | "22"
   | "23"
   | "24";

export interface ITimeTable {
   maxSlots?: number;
   disabledSlots?: Array<string>;
   availableTimeRange?: [IHour, IHour]; // [start hour, end hour]
   cellDuration?: number; // Duration of each class in minutes
   showDates?: boolean;
   onChange?: (selectedSlots: Array<{ day: IWeekDay; time: string }>) => void;
   startDate?: Moment | number; // moment will get a start date and number will add as an offset from now
   // classnames
   // Container
   containerClassName?: string;
   containerStyles?: CSSProperties;
}
