import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public authorId?: string;
    public id?: string;
    public instructions: string;
    public price?: number;
    public preparationTime?: number;
    public tags?: string[];
    public calories?: number;

    constructor(
        name: string,
        desc: string,
        imagePath: string,
        ingredients: Ingredient[],
        authorId: string,
        id: string,
        instructions: string,
        price: number,
        preparationTime: number,
        tags: string[],
        calories: number
    ) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.authorId = authorId;
        this.id = id;
        this.instructions = instructions;
        this.price = price; 
        this.preparationTime = preparationTime;
        this.tags = tags;
        this.calories = calories;
    }
}