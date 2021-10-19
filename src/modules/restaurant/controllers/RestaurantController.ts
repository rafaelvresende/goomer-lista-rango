import { Request, Response } from "express";
import AddOpeningHoursService from "../services/AddOpeningHoursService";
import CreateRestaurantService from "../services/CreateRestaurantService";
import DeleteRestaurantService from "../services/DeleteRestaurantService";
import GetRestaurantByIdService from "../services/GetRestaurantByIdService";
import ListDaysOfTheWeekService from "../services/ListDaysOfTheWeekService";
import ListRestaurantsService from "../services/ListRestaurantsService";
import RemoveOpeningHoursService from "../services/RemoveOpeningHoursService";
import UpdateRestaurantService from "../services/UpdateRestaurantService";

export default class RestaurantController {

    public async listRestaurants(request: Request, response: Response) {

        try {

            const listRestaurants = ListRestaurantsService.resolve();
            const restaurants = await listRestaurants.execute();

            response.status(200).json({ restaurants });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async listDaysOfTheWeek(request: Request, response: Response) {

        try {

            const listDaysOfTheWeek = ListDaysOfTheWeekService.resolve();
            const daysOfTheWeek = await listDaysOfTheWeek.execute();

            response.status(200).json({ daysOfTheWeek });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async createRestaurant(request: Request, response: Response) {

        try {

            const {
                name,
                street,
                number,
                neighborhood,
                city,
                state,
            } = request.body;

            if (!name) throw new Error("Por favor, informe o nome do restaurante!");
            if (!street) throw new Error("Por favor, informe o logradouro do restaurante!");
            if (!number) throw new Error("Por favor, informe o número do restaurante!");
            if (!neighborhood) throw new Error("Por favor, informe o bairro do restaurante!");
            if (!city) throw new Error("Por favor, informe a cidade do restaurante!");
            if (!state) throw new Error("Por favor, informe o estado do restaurante!");

            const createRestaurant = CreateRestaurantService.resolve();
            const restaurantId = await createRestaurant.execute({
                name,
                street,
                number,
                neighborhood,
                city,
                state,
            });

            const getRestaurantById = GetRestaurantByIdService.resolve();
            const restaurant = await getRestaurantById.execute({ restaurantId });

            response.status(200).json({ restaurant });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async getRestaurant(request: Request, response: Response) {

        try {

            const { restaurantId } = request.body;
            if (!restaurantId) throw new Error("Escolha qual restaurante deseja visualizar!");

            const getRestaurantById = GetRestaurantByIdService.resolve();
            const restaurant = await getRestaurantById.execute({ restaurantId });

            response.status(200).json({ restaurant });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async updateRestaurant(request: Request, response: Response) {

        try {

            const {
                id,
                name,
                street,
                number,
                neighborhood,
                city,
                state,
            } = request.body;

            if (!id) throw new Error("Por favor, informe qual restaurante deseja editar!");

            const updateRestaurant = UpdateRestaurantService.resolve();
            await updateRestaurant.execute({
                id,
                name,
                street,
                number,
                neighborhood,
                city,
                state,
            });

            const getRestaurantById = GetRestaurantByIdService.resolve();
            const restaurant = await getRestaurantById.execute({ restaurantId: id });

            response.status(200).json({ restaurant });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async deleteRestaurant(request: Request, response: Response) {

        try {

            const { restaurantId } = request.body;
            if (!restaurantId) throw new Error("Escolha qual restaurante deseja excluir!");

            const deleteRestaurant = DeleteRestaurantService.resolve();
            await deleteRestaurant.execute({ restaurantId });

            response.status(200).json({ message: "Restaurante excluído com sucesso!" });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async addOpeningHours(request: Request, response: Response) {

        try {

            const {
                days,
                startTime,
                endTime,
                restaurantId,
            } = request.body;

            if (!days) throw new Error("Informe o(s) dia(s) da semana ao(s) qual(is) se aplica(m) esse horário de funcionamento!");
            if (!startTime) throw new Error("Informe o horário de início do atendimento!");
            if (!endTime) throw new Error("Informe o horário de término do atendimento!");
            if (!restaurantId) throw new Error("Escolha qual restaurante deseja excluir!");

            const addOpeningHours = AddOpeningHoursService.resolve();
            await addOpeningHours.execute({
                days,
                startTime,
                endTime,
                restaurantId,
            });

            response.status(200).json({ message: "Novo horário de funcionamento adicionado com sucesso!" });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }

    public async removeOpeningHours(request: Request, response: Response) {

        try {

            const { openingHoursId } = request.body;
            if (!openingHoursId) throw new Error("Escolha qual horário de funcionamento deseja remover!");

            const removeOpeningHours = RemoveOpeningHoursService.resolve();
            await removeOpeningHours.execute({ openingHoursId });

            response.status(200).json({ message: "Horário de funcionamento removido com sucesso!" });

        } catch(error: any) {
            response.status(500).json({ error: error.message });
        }
    }
}
