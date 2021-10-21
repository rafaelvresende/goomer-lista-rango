type IDayOfTheWeek =
    "sunday" |
    "monday" |
    "tuesday" |
    "wednesday" |
    "thursday" |
    "friday" |
    "saturday";

export type DescriptionsByDaysOfTheWeek = {
    [day in IDayOfTheWeek]: string;
}

export const DaysOfTheWeekDescriptions: DescriptionsByDaysOfTheWeek = {
    sunday: "Domingo",
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado",
};

export const ValidDaysOfTheWeekList = Object.keys(DaysOfTheWeekDescriptions) as IDayOfTheWeek[];

export default IDayOfTheWeek;
