export interface GamesProps {
    type: string;
    color: string;
    description: string;
    range: number;
    price: number;
    'min-cart-value': number;
    'max-number': number;
}

export interface GamesItem {
    games: GamesProps,
}

export interface GamesState {
    games: GamesItem[];
}