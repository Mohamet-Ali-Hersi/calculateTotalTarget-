const calculateTotalTarget = (startDate, endDate, totalAnnualTarget) => {
    // Helper function to check if a date is a Friday
    const isFriday = (date) => {
        return new Date(date).getDay() === 5; // 5 is Friday
    };

    // Helper function to get the number of days in a month excluding Fridays
    const getWorkingDaysInMonth = (year, month) => {
        let date = new Date(year, month, 1);
        let workingDays = 0;
        while (date.getMonth() === month) {
            if (!isFriday(date)) {
                workingDays++;
            }
            date.setDate(date.getDate() + 1);
        }
        return workingDays;
    };

    // Helper function to get working days within a specific range excluding Fridays
    const getWorkingDaysInRange = (startDate, endDate) => {
        let start = new Date(startDate);
        let end = new Date(endDate);
        let workingDays = 0;
        while (start <= end) {
            if (!isFriday(start)) {
                workingDays++;
            }
            start.setDate(start.getDate() + 1);
        }
        return workingDays;
    };

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Initialize arrays for storing results
    const daysExcludingFridays = [];
    const daysWorkedExcludingFridays = [];
    const monthlyTargets = [];

    let totalTarget = 0;
    let currentMonth = start.getMonth();
    let currentYear = start.getFullYear();

    // Iterate through each month in the range
    while (currentYear < end.getFullYear() || (currentYear === end.getFullYear() && currentMonth <= end.getMonth())) {
        // Get total working days in the current month
        const totalWorkingDays = getWorkingDaysInMonth(currentYear, currentMonth);
        daysExcludingFridays.push(totalWorkingDays);

        // Get the working days in the range for this month
        let startOfMonth = new Date(currentYear, currentMonth);
        let endOfMonth = new Date(currentYear, currentMonth + 1, 0); // last day of the month

        // Constrain start and end dates to the range
        let startInRange = start > startOfMonth ? start : startOfMonth;
        let endInRange = end < endOfMonth ? end : endOfMonth;

        const workedDays = getWorkingDaysInRange(startInRange, endInRange);
        daysWorkedExcludingFridays.push(workedDays);

        // Proportionally distribute the target
        const monthlyTarget = (workedDays / totalWorkingDays) * (totalAnnualTarget / 12);
        monthlyTargets.push(monthlyTarget);

        totalTarget += monthlyTarget;

        // Move to the next month
        currentMonth++;
        if (currentMonth === 12) {
            currentMonth = 0;
            currentYear++;
        }
    }

    console.log("\n")

    console.log('daysExcludingFridays:', daysExcludingFridays);
    console.log('daysWorkedExcludingFridays:', daysWorkedExcludingFridays);
    console.log('monthlyTargets:', monthlyTargets);
    console.log('totalTarget:', totalTarget);

    console.log("\n__")
};


calculateTotalTarget('2024-01-01', '2024-01-31', 5220);