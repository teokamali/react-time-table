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
      />
    </div>
  );
}

export default App;
