import TimeTable from "./components/TimeTable/TimeTable";
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
               <div
                  className={"container"} // Apply the grid container class
               >
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
                                    {({ isDisabled, isSelected }) => {
                                       return (
                                          <>
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
                                          </>
                                       );
                                    }}
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
