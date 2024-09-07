import TimeTable from "./components/timeTable";

function App() {
   return (
      <div>
         <TimeTable
            availableTimeRange={["8", "24"]}
            cellDuration={60}
            disabledSlots={["2024-09-07T08:00"]}
            showDates
            onChange={(data) => console.log(data)}
            containerClassName=""
            containerStyles={{}}
            maxSlots={20}
            startDate={0}
         />
      </div>
   );
}

export default App;
