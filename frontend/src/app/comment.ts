import { Listing } from "./listing";
import { User } from "./user";

export interface Comment {
    text: string;
    user: User;
    listing: Listing;
}
