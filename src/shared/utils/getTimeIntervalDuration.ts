interface IRequest {
    startHour: number;
    startMinutes: number;
    endHours: number;
    endMinutes: number;
}

interface IResponse {
    startTimeInMinutes: number;
    endTimeInMinutes: number;
    durationInMinutes: number;
}

export default function getTimeIntervalDuration({
    startHour,
    startMinutes,
    endHours,
    endMinutes,
}: IRequest): IResponse {

    const startTimeInMinutes = (startHour * 60) + startMinutes;
    const endTimeInMinutes = (endHours * 60) + endMinutes;

    const durationInMinutes = endTimeInMinutes - startTimeInMinutes;

    return {
        startTimeInMinutes,
        endTimeInMinutes,
        durationInMinutes,
    };
}
