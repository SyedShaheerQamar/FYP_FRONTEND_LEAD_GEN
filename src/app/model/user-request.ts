import { Category } from "./category";

export interface UserRequest {
    id: number|null|undefined,
    request: string|null|undefined,
    approvedbySystem: boolean|null|undefined,
    approvedbyAdmin: boolean|null|undefined,
    price: number|null|any;
    category: Category[],
    bids: []|null|undefined,
    categoryName: (string | null | undefined)[];
}
