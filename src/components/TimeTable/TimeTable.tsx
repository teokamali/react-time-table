import { FC, useState, createContext, useContext, ReactNode } from "react";
import {
   IDate,
   IWeekDay,
   TimeTableContextProps,
   TimeTableType,
} from "../types/timeTable.types";
import { generateTimeSlots } from "../../utils/generateTimeSlots";
import { generateWeekDays } from "../../utils/generateWeekDays";
import { BaseProps } from "../types/global";

export const TimeTableContext = createContext<TimeTableContextProps | null>(
   null,
);

export const TimeTable: TimeTableType = (props) => {
   const {
      maxSlots = 9999,
      disabledSlots = [],
      availableTimeRange = ["1", "24"],
      cellDuration = 60,
      onChange = () => {},
      startDate = 0,
      children,
   } = props;

   const [selectedSlots, setSelectedSlots] = useState<IDate[]>([]);

   const isSlotSelected = (timestamp: string) =>
      selectedSlots.some((slot) => slot.timestamp === timestamp);

   const isSlotDisabled = (timestamp: string) =>
      disabledSlots.some((slot) => slot === timestamp);

   const handleSlotClick = (day: IWeekDay, time: string, timestamp: string) => {
      const isSelected = isSlotSelected(timestamp);

      if (isSelected) {
         const newSelectedSlots = selectedSlots.filter(
            (slot) => !(slot.timestamp === timestamp),
         );
         setSelectedSlots(newSelectedSlots);
         onChange(newSelectedSlots);
      } else if (selectedSlots.length < maxSlots) {
         const newSelectedSlots = [...selectedSlots, { day, time, timestamp }];
         setSelectedSlots(newSelectedSlots);
         onChange(newSelectedSlots);
      }
   };

   const timeSlots = generateTimeSlots(
      availableTimeRange[0],
      availableTimeRange[1],
      cellDuration,
   );

   const days = generateWeekDays(startDate);

   return (
      <TimeTableContext.Provider
         value={{
            timeSlots,
            days,
            selectedSlots,
            handleSlotClick,
            isSlotSelected,
            isSlotDisabled,
         }}
      >
         {typeof children === "function"
            ? children({ timeSlots, days })
            : children}
      </TimeTableContext.Provider>
   );
};

const Column: BaseProps = ({ children }) => {
   return <div>{children}</div>;
};

const Day: BaseProps = ({ children }) => {
   return <div>{children}</div>;
};

const Slot: FC<{
   timestamp: string;
   day: IWeekDay;
   time: string;
   children?: ReactNode;
}> = ({ timestamp, day, time, children }) => {
   const context = useContext(TimeTableContext);
   if (!context) {
      throw new Error("Slot must be used within a TimeTable component");
   }

   const { handleSlotClick, isSlotDisabled, isSlotSelected } = context;
   const isDisabled = isSlotDisabled(timestamp);
   const isSelected = isSlotSelected(timestamp);

   return (
      <div
         onClick={() => !isDisabled && handleSlotClick(day, time, timestamp)}
         style={{
            backgroundColor: isDisabled
               ? "gray"
               : isSelected
                 ? "green"
                 : "white",
            cursor: isDisabled ? "not-allowed" : "pointer",
         }}
      >
         {children}
      </div>
   );
};

TimeTable.Column = Column;
TimeTable.Day = Day;
TimeTable.Slot = Slot;

export default TimeTable;
