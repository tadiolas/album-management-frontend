
import { Photo } from "@/shared/model";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getPhotosPagination, getRandomDog } from "../services/photoService";
import { toast } from "sonner"

export function usePhotoList() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const [shouldCallFetchMore, setShouldCallFetchMore] = useState(true);

    if (!id) {
        toast.error("No userId found in URL parameters");
    }

    async function fetchMorePhotos() {
        if (!shouldCallFetchMore) {
            console.log(shouldCallFetchMore)
            return;
        }
        try {
            const newPhotos = await getPhotosPagination(id!, page);
            if (!newPhotos || !newPhotos.length) {
                setShouldCallFetchMore(false);
                console.log("No more photos available.");
                return;
            }
            for (let i = 0; i < newPhotos.length; i++) {
                const element = newPhotos[i];
                const dog = await getRandomDog();
                if (dog.status === 'success') {
                    element.url = dog.message;
                }
            }
            setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            toast.error("Error fetching photos");
            console.error("Error fetching photos:", error);
        }
    }

    return { photos, shouldCallFetchMore, fetchMorePhotos };
}