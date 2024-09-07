import { FC, useState } from "react";
import { Day, IDate, ITimeTable, IWeekDay } from "./timeTable.types";
import styles from "./timeTable.module.css";
import moment from "moment";
const TimeTable: FC<ITimeTable> = ({
  maxSlots = 9999,
  disabledSlots = [],
  availableTimeRange = ["1", "24"],
  cellDuration = 60,
  onChange = () => {},
  showDates = false,
  containerClassName,
  containerStyles,
}) => {
  const generateWeekDays = (offset: number) => {
    const days: IWeekDay[] = [];
    const currentWeek = moment().add(offset, "days");

    for (let i = 0; i < 7; i++) {
      days.push({
        dayName: currentWeek.format("dddd") as Day,
        dayDate: currentWeek.format("MMM DD"),
        fullDate: currentWeek.format("YYYY-MM-DD"),
      });
      currentWeek.add(1, "day");
    }
    return days;
  };
  const days = generateWeekDays(0);

  const [selectedSlots, setSelectedSlots] = useState<IDate[]>([]);

  const isSlotSelected = (timestamp: string) =>
    selectedSlots.some((slot) => slot.timestamp === timestamp);

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

  const isSlotDisabled = (timestamp: string) =>
    disabledSlots.some((slot) => slot === timestamp);

  const generateTimeSlots = (
    startHour: string,
    endHour: string,
    duration: number
  ): string[] => {
    const slots: string[] = [];
    let currentTime = +startHour * 60; // Convert start hour to minutes
    while (currentTime <= +endHour * 60) {
      // Convert end hour to minutes
      const hours = Math.floor(currentTime / 60);
      const minutes = currentTime % 60;
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      slots.push(formattedTime);
      currentTime += duration; // Increment by the class duration
    }

    return slots;
  };

  const timeSlots = generateTimeSlots(
    availableTimeRange[0],
    availableTimeRange[1],
    cellDuration
  );

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
