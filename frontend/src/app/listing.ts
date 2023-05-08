import { Comment } from "./comment";
import { User } from "./user";

export interface Listing {
    title: string;
    description: string;
    user: User;
    _id: string;
    comments: Comment[];
    upvotes: number;
}
