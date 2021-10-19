interface IResponse {
    valid: boolean;
    time: string; // "hh:mm"
    hours: number;
    minutes: number;
}

export default function validateAndFormatTime(time: string): IResponse {

    const invalidTime: IResponse = {
        valid: false,
        time: "00:00",
        hours: 0,
        minutes: 0,
    };

    try {

        const regex = /^\d{2}:\d{2}$|^\d{2}:\d{2}:\d{2}$/g; // 00:00 || 00:00:00

        if (
            !time ||
            typeof time !== "string" ||
            !time.match(regex)
        ) {
            return invalidTime;
        }

        const hoursString = time.substring(0, 2);
        const minutesString = time.substring(3, 5);

        const hours = parseInt(hoursString, 10);
        const minutes = parseInt(minutesString, 10);

        if (!(
            hours >= 0 &&
            hours <= 23 &&
            minutes >= 0 &&
            minutes <= 59
        )) {
            return invalidTime;
        }

        const formatedHoursString = `${hours}`.padStart(2, "0");
        const formatedMinutesString = `${minutes}`.padStart(2, "0");

        const validTime: IResponse = {
            valid: true,
            time: `${formatedHoursString}:${formatedMinutesString}`,
            hours,
            minutes,
        };

        return validTime;

    } catch {
        return invalidTime;
    }
}
