import { Moment } from "moment";
import { FC, ReactNode } from "react";
import { BaseProps } from "./global";

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

// Create a context to share state between compound components
export interface TimeTableContextProps {
   selectedSlots: IDate[];
   handleSlotClick: (day: IWeekDay, time: string, timestamp: string) => void;
   isSlotSelected: (timestamp: string) => boolean;
   isSlotDisabled: (timestamp: string) => boolean;
   days: IWeekDay[];
   timeSlots: string[];
}

export interface ITimeTable {
   maxSlots?: number;
   disabledSlots?: Array<string>;
   availableTimeRange?: [IHour, IHour]; // [start hour, end hour]
   cellDuration?: number; // Duration of each class in minutes
   showDates?: boolean;
   onChange?: (selectedSlots: Array<{ day: IWeekDay; time: string }>) => void;
   startDate?: Moment | number; // moment will get a start date and number will add as an offset from now
   children?:
      | ((context: { timeSlots: string[]; days: IWeekDay[] }) => ReactNode)
      | ReactNode;
}

export type ContainerProps = FC<{
   children: (context: TimeTableContextProps | null) => ReactNode;
}>;

export type TimeTableType = FC<ITimeTable> & {
   Column: BaseProps;
   Day: BaseProps;
   Slot: BaseProps<{ day: IWeekDay; time: string; timestamp: string }>;
};
