function getFormattedDate(date) {
    let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        let timeOfDay = "AM"
        let hour = date.getHours();
        if (hour >= 12) {
            timeOfDay = "PM"
        }
        if (hour > 12) {
            hour-=12;
        }

        let sHour = hour.toString().padStart(2, '0');
        let sMinute = date.getMinutes().toString().padStart(2, '0');
        return `${month}/${day}/${year} ${sHour}:${sMinute} ${timeOfDay}`;

    }