export class Ingredient {
    constructor(
        public name: string, 
        public amount: number,
        public unit?: 'g' | 'kg' | 'l' | 'piece(s)',
        public price?: number, 
        ) { }
};