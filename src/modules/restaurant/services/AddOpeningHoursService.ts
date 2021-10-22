import IDayOfTheWeek, { ValidDaysOfTheWeekList } from "../../../shared/interfaces/IDayOfTheWeek";
import checkTimeIntervalOverlaps from "../../../shared/utils/checkTimeIntervalOverlaps";
import getTimeIntervalDuration from "../../../shared/utils/getTimeIntervalDuration";
import validateAndFormatTime from "../../../shared/utils/validateAndFormatTime";
import { injectable, container, inject } from "tsyringe";
import IRestaurantRepository from "../repositories/IRestaurantRepository";

interface IRequest {
    days: IDayOfTheWeek[];
    startTime: string;
    endTime: string;
    restaurantId: number;
}

@injectable()
export default class AddOpeningHoursService {

    constructor(
        @inject("RestaurantRepository")
        private restaurantRepository: IRestaurantRepository,
    ) { }

    public async execute({
        days,
        startTime,
        endTime,
        restaurantId,
    }: IRequest): Promise<void> {

        if (!(Array.isArray(days) && days.length > 0)) throw new Error("Dia(s) da semana inválido(s)!");
        days.map((day) => {
            if (!ValidDaysOfTheWeekList.includes(day)) throw new Error("Dia da semana inválido!");
        });

        const startTimeValidation = validateAndFormatTime(startTime);
        const endTimeValidation = validateAndFormatTime(endTime);

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
        
        const previousOpeningHours = await this.restaurantRepository.listOpeningHoursByRestaurant(restaurantId);

        const overlaps = checkTimeIntervalOverlaps({
            days,
            startTimeInMinutes: timeInterval.startTimeInMinutes,
            endTimeInMinutes: timeInterval.endTimeInMinutes,
            previousTimeIntervals: previousOpeningHours,
        });

        if (overlaps.length > 0) {
            throw new Error(`Atenção! Este horário de funcionamento está em sobreposição com os seguintes horários já adicionados previamente: ${overlaps.join("; ")}`);
        }
        
        await Promise.all(days.map(async (day) => {
            await this.restaurantRepository.addOpeningHours({
                day,
                startTime,
                endTime,
                restaurantId,
            });
        }));
    }

    public static resolve() {
        return container.resolve(this);
    }
}
