import IDayOfTheWeek, { ValidDaysOfTheWeekList } from "@shared/interfaces/IDayOfTheWeek";
import checkTimeIntervalOverlaps from "@shared/utils/checkTimeIntervalOverlaps";
import getTimeIntervalDuration from "@shared/utils/getTimeIntervalDuration";
import validateAndFormatTime from "@shared/utils/validateAndFormatTime";
import { injectable, container } from "tsyringe";

interface IRequest {
    promotionHours: IPromotionHoursToValidate[];
}

interface IPromotionHoursToValidate {
    day: IDayOfTheWeek;
    startTime: string;
    endTime: string;
}

@injectable()
export default class ValidatePromotionHoursService {

    constructor() { }

    public execute({
        promotionHours,
    }: IRequest): void {

        const validatedPromotionHours: IPromotionHoursToValidate[] = [];

        if (!(Array.isArray(promotionHours) && promotionHours.length > 0)) throw new Error("Horários da promoção inválidos!");
        promotionHours.map((promoHours) => {

            if (!ValidDaysOfTheWeekList.includes(promoHours.day)) throw new Error("Dia da semana inválido!");

            const startTimeValidation = validateAndFormatTime(promoHours.startTime);
            const endTimeValidation = validateAndFormatTime(promoHours.endTime);

            if (!(startTimeValidation.valid && endTimeValidation.valid)) {
                throw new Error("Horários inválidos! Por favor, informe os horários de início e término no formato 'hh:mm'!");
            }

            const timeInterval = getTimeIntervalDuration({
                startHour: startTimeValidation.hours,
                startMinutes: startTimeValidation.minutes,
                endHours: endTimeValidation.hours,
                endMinutes: endTimeValidation.minutes,
            });
    
            if (timeInterval.durationInMinutes < 15) {
                throw new Error("Informe os horários de início e término com um intervalo de pelo menos 15 minutos!");
            }

            const overlaps = checkTimeIntervalOverlaps({
                days: [promoHours.day],
                startTimeInMinutes: timeInterval.startTimeInMinutes,
                endTimeInMinutes: timeInterval.endTimeInMinutes,
                previousTimeIntervals: validatedPromotionHours,
            });

            if (overlaps.length > 0) {
                throw new Error(`Atenção! Os seguintes horários da promoção estão em sobreposição: ${overlaps.join("; ")}`);
            } else {
                validatedPromotionHours.push(promoHours);
            }
        });
    }

    public static resolve() {
        return container.resolve(this);
    }
}
