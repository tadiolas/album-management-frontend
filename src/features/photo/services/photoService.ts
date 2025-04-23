import { Photo } from "@/shared/model";
import { getJsonPlaceholderGeneric, getRandomDogGeneric } from "@/shared/baseService";

export function getPhotoByAlbumId(albumId: string): Promise<Photo[]> {
  return getJsonPlaceholderGeneric(`albums/${albumId}/photos`);
}

export function getPhotosPagination(albumId: string, page: number): Promise<Photo[]> {
  return getJsonPlaceholderGeneric(`albums/${albumId}/photos?_page=${page}&_limit=10`);
}

export function getRandomDog(): Promise<{ message: string, status: string }> {
  return getRandomDogGeneric();
}
