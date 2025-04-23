import { User } from "@/shared/model";
import { getJsonPlaceholderGeneric } from "@/shared/baseService";

export function getAllUsers() : Promise<User[]> {
    return getJsonPlaceholderGeneric(`users`);
}
