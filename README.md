# @teokamali/react-time-table

A headless time slot table component for React. This library provides a flexible, headless TimeTable component that allows you to manage and display time slots in a customizable manner without enforcing any specific UI. It uses context and compound components to enable rich interactions with time slots.

## Installation

To install the library, use npm or yarn:

    bash
    npm install @teokamali/react-time-table
    # or
    yarn add @teokamali/react-time-table

## Usage

### Basic Usage

    import TimeTable from "@teokamali/react-time-table";
    import "./styles/timeTable.css";

    function App() {
       return (
          <div>
             <TimeTable
                availableTimeRange={["1", "24"]}
                cellDuration={60}
                disabledSlots={["2024-09-07T08:00"]}
                onChange={(data) => console.log(data)}
                maxSlots={20}
                startDate={0}
             >
                {({ timeSlots, days }) => (
                   <div className={"container"}>
                      <TimeTable.Column>
                         <span className={"whiteBox"}>Time/Day</span>
                         {timeSlots.map((time) => (
                            <TimeTable.Day key={time}>
                               <div className={"timeSlot"}>
                                  <span className={"timeSlotText"}>{time}</span>
                               </div>
                            </TimeTable.Day>
                         ))}
                      </TimeTable.Column>
                      {days.map((day) => (
                         <TimeTable.Column key={day.fullDate}>
                            <div>
                               <div className={"dayBox"}>
                                  <span className="dayText dayTextVisibleSm">
                                     {day.dayName}
                                  </span>
                                  <br />
                                  <span className="dayText dayTextHiddenSm">
                                     {day.dayDate}
                                  </span>
                               </div>
                               {timeSlots.map((slot) => {
                                  const timestamp = `${day.fullDate}T${slot}`;
                                  return (
                                     <TimeTable.Slot
                                        key={timestamp}
                                        timestamp={timestamp}
                                        day={day}
                                        time={slot}
                                     >
                                        {({ isDisabled, isSelected }) => (
                                           <div
                                              className={`slot ${
                                                 isDisabled
                                                    ? "slotDisabled"
                                                    : isSelected
                                                      ? "slotSelected"
                                                      : ""
                                              }`}
                                           >
                                              {slot}
                                           </div>
                                        )}
                                     </TimeTable.Slot>
                                  );
                               })}
                            </div>
                         </TimeTable.Column>
                      ))}
                   </div>
                )}
             </TimeTable>
          </div>
       );
    }

    export default App;

### Components

-  **`TimeTable`**: The main component that provides context and manages state for time slots. Accepts the following props:

   -  `maxSlots` (number): Maximum number of slots that can be selected.
   -  `disabledSlots` (array of strings): List of timestamps that are disabled.
   -  `availableTimeRange` (array of strings): The range of hours available (e.g., `["1", "24"]`).
   -  `cellDuration` (number): Duration of each time slot in minutes.
   -  `onChange` (function): Callback function that is called whenever the selected slots change.
   -  `startDate` (number or Moment): The starting date for the week.
   -  `children` (function or ReactNode): A function or ReactNode that receives the `timeSlots` and `days` as arguments.

-  **`TimeTable.Column`**: A container for columns in the timetable.

-  **`TimeTable.Day`**: A container for days in the timetable.

-  **`TimeTable.Slot`**: Represents a single time slot. Accepts the following props:
   -  `timestamp` (string): The timestamp for the slot.
   -  `day` (IWeekDay): The day associated with the slot.
   -  `time` (string): The time of the slot.
   -  `children` (function or ReactNode): A function or ReactNode that receives the `isDisabled` and `isSelected` state.

### Props API

#### `TimeTable` Props

-  `maxSlots` (optional): `number` — The maximum number of time slots that can be selected. Default is `9999`.

-  `disabledSlots` (optional): `Array<string>` — An array of timestamps representing disabled time slots.

-  `availableTimeRange` (optional): `[IHour, IHour]` — An array with start and end hours for the available time range (e.g., `["1", "24"]`).

-  `cellDuration` (optional): `number` — The duration of each time slot in minutes. Default is `60`.

-  `onChange` (optional): `(selectedSlots: IDate[]) => void` — A callback function called when the selected slots change.

-  `startDate` (optional): `Moment | number` — The start date for the week. Can be a Moment object or a number representing the offset from now.

-  `children` (optional): `((context: { timeSlots: string[]; days: IWeekDay[] }) => ReactNode) | ReactNode` — A function or ReactNode to render the table. Receives `timeSlots` and `days` as arguments.

#### `TimeTable.Slot` Props

-  `timestamp`: `string` — The timestamp of the slot.

-  `day`: `IWeekDay` — The day associated with the slot.

-  `time`: `string` — The time of the slot.

-  `children` (optional): `((context: { isDisabled: boolean; isSelected: boolean }) => ReactNode) | ReactNode` — A function or ReactNode that receives `isDisabled` and `isSelected` state.

### Types

-  **`IDate`**: Represents a selected slot with `day`, `time`, and `timestamp`.
-  **`IWeekDay`**: Represents a day of the week with `dayName`, `dayDate`, and `fullDate`.
-  **`ITimeTable`**: The props interface for `TimeTable`.
-  **`SlotType`**: The type for the `Slot` component.
-  **`TimeTableType`**: The type for the `TimeTable` component, including compound components.

## License

MIT License

## Author

Teo Kamalipour

## Repository

Find the source code and additional information at [GitHub - @teokamali/react-time-table](https://github.com/teokamali/react-time-table)
