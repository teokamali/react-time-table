import TimeTable from "./components/TimeTable/TimeTable";

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
                  style={{
                     display: "flex",
                     width: "100%",
                     gap: "20px",
                  }}
               >
                  <TimeTable.Column>
                     <span>Time/Day</span>
                     {timeSlots.map((time) => (
                        <TimeTable.Day key={time}>{time}</TimeTable.Day>
                     ))}
                  </TimeTable.Column>
                  <section
                     style={{
                        flexGrow: "1",
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        gridTemplateRows: "repeat(3, 50px)",
                        gridColumnGap: "2px",
                        gridRowGap: "2px",
                     }}
                  >
                     {days.map((day) => (
                        <TimeTable.Column key={day.fullDate}>
                           <div
                              style={{
                                 display: "flex",
                                 flexDirection: "column",
                                 gap: "5px",
                              }}
                           >
                              <div>
                                 <span>{day.dayName}</span>
                                 <br />
                                 <span>{day.dayDate}</span>
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
                                       {slot}
                                    </TimeTable.Slot>
                                 );
                              })}
                           </div>
                        </TimeTable.Column>
                     ))}
                  </section>
               </div>
            )}
         </TimeTable>
      </div>
   );
}

export default App;
