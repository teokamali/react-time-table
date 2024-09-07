export const generateTimeSlots = (
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
