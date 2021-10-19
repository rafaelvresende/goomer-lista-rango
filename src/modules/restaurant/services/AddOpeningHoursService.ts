import IDayOfTheWeek, { ValidDaysOfTheWeekList } from "@shared/interfaces/IDayOfTheWeek";
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

        // TO DO: fazer validações de horário
        
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
