import { Album } from "@/shared/model";
import { getJsonPlaceholderGeneric } from "@/shared/baseService";

export function getAllAlbumsByUserId(userId: string) : Promise<Album[]> {
    return getJsonPlaceholderGeneric(`users/${userId}/albums`);
}
