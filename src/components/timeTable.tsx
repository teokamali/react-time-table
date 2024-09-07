import { FC, useState } from "react";
import { IDate, ITimeTable, IWeekDay } from "./timeTable.types";
import styles from "./timeTable.module.css";
import { generateTimeSlots } from "../utils/generateTimeSlots";
import { generateWeekDays } from "../utils/generateWeekDays";

const TimeTable: FC<ITimeTable> = ({
  maxSlots = 9999,
  disabledSlots = [],
  availableTimeRange = ["1", "24"],
  cellDuration = 60,
  onChange = () => {},
  showDates = false,
  containerClassName,
  startDate = 0,
  containerStyles,
}) => {
  const [selectedSlots, setSelectedSlots] = useState<IDate[]>([]);

  const isSlotSelected = (timestamp: string) =>
    selectedSlots.some((slot) => slot.timestamp === timestamp);
  const isSlotDisabled = (timestamp: string) =>
    disabledSlots.some((slot) => slot === timestamp);

  const handleSlotClick = (day: IWeekDay, time: string, timestamp: string) => {
    const isSelected = isSlotSelected(timestamp);

    if (isSelected) {
      const newSelectedSlots = selectedSlots.filter(
        (slot) => !(slot.timestamp === timestamp)
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
    cellDuration
  );

  const days = generateWeekDays(startDate);

  return (
    <div
      className={`${styles.container} ${containerClassName}`}
      style={containerStyles}
    >
      <div className={`${styles.gridItem} day-column`}>
        <div className={styles.whiteBox}>day/time</div>
        {timeSlots.map((slot) => (
          <div key={slot} className={styles.timeSlot}>
            <span className={styles.timeSlotText}>{slot}</span>
          </div>
        ))}
      </div>
      {days.map((day) => (
        <div className={styles.gridItem} key={day.fullDate}>
          <div className={styles.dayBox}>
            <span
              className={`${styles.dayText} ${styles.dayTextVisibleSm}`}
              style={{ display: window.innerWidth < 600 ? "none" : "inline" }}
            >
              {day.dayName}
              {showDates ? <span>{day.dayDate}</span> : <></>}
            </span>
            <span
              className={`${styles.dayText} ${styles.dayTextHiddenSm}`}
              style={{ display: window.innerWidth < 600 ? "inline" : "none" }}
            >
              {day.dayName.slice(0, 2)}
            </span>
          </div>
          <div className={styles.slotContainer}>
            {timeSlots.map((slot) => {
              const timestamp = `${day.fullDate}T${slot}`;
              const isDisabled = isSlotDisabled(timestamp);
              const isSelected = isSlotSelected(timestamp);

              return (
                <div
                  key={day + slot}
                  onClick={() =>
                    !isDisabled && handleSlotClick(day, slot, timestamp)
                  }
                  className={`${styles.slot} ${
                    isDisabled
                      ? styles.slotDisabled
                      : isSelected
                      ? styles.slotSelected
                      : ""
                  }`}
                ></div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeTable;
