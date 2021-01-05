export interface IExercise {
    id: string;
    name: string;
    duration: number;
    calories: number;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
}

export class Exercise implements IExercise {
    constructor(data?: IExercise) {
        this.id = data?.id;
        this.name = data?.name;
        this.duration = data?.duration;
        this.calories = data?.calories;
        this.date = data?.date;
        this.state = data?.state;
    }

    public id: string;
    public name: string;
    public duration: number;
    public calories: number;
    public date?: Date;
    public state?: 'completed' | 'cancelled' | null;
}
