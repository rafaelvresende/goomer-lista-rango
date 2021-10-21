import IDayOfTheWeek, { DaysOfTheWeekDescriptions } from "../../shared/interfaces/IDayOfTheWeek";
import getTimeIntervalDuration from "./getTimeIntervalDuration";
import validateAndFormatTime from "./validateAndFormatTime";

interface ITimeInterval {
    day: IDayOfTheWeek;
    startTime: string;
    endTime: string;
}

interface IRequest {
    days: IDayOfTheWeek[];
    startTimeInMinutes: number;
    endTimeInMinutes: number;
    previousTimeIntervals: ITimeInterval[];
}

export default function checkTimeIntervalOverlaps({
    days,
    startTimeInMinutes,
    endTimeInMinutes,
    previousTimeIntervals,
}: IRequest): string[] {

    if (previousTimeIntervals.length === 0) return [];

    const overlaps: string[] = [];

    days.map((day) => {

        const previousTimeIntervalsInThisDay = previousTimeIntervals.filter((timeInterval) => timeInterval.day === day);

        previousTimeIntervalsInThisDay.map((previousTimeInterval) => {

            const prevStartTime = validateAndFormatTime(previousTimeInterval.startTime);
            const prevEndTime = validateAndFormatTime(previousTimeInterval.endTime);

            const prevTimeInterval = getTimeIntervalDuration({
                startHour: prevStartTime.hours,
                startMinutes: prevStartTime.minutes,
                endHours: prevEndTime.hours,
                endMinutes: prevEndTime.minutes,
            });

            const prevStartTimeInMinutes = prevTimeInterval.startTimeInMinutes;
            const prevEndTimeInMinutes = prevTimeInterval.endTimeInMinutes;

            if (
                (startTimeInMinutes >= prevStartTimeInMinutes && startTimeInMinutes <= prevEndTimeInMinutes) ||
                (endTimeInMinutes >= prevStartTimeInMinutes && endTimeInMinutes <= prevEndTimeInMinutes) ||
                (startTimeInMinutes <= prevStartTimeInMinutes && endTimeInMinutes >= prevEndTimeInMinutes)
            ) {
                overlaps.push(`${DaysOfTheWeekDescriptions[day]} das ${prevStartTime.time} as ${prevEndTime.time}`);
            }
        });
    });

    return overlaps;
}
