import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePhotoList } from "../hooks/usePhotoList";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useGlobalState } from "@/shared/GlobalStateProvider";

export function PhotoList() {
    const { photos, shouldCallFetchMore, fetchMorePhotos } = usePhotoList();
    const [isLoading, setIsLoading] = useState(false);
    const { selectedFamilyMember, selectedAlbum } = useGlobalState();

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 1.0,
        initialInView: true,
    });

    useEffect(() => {
        if (inView && !isLoading && shouldCallFetchMore) {
            setIsLoading(true);
            fetchMorePhotos().finally(() => setIsLoading(false));
        }
    }, [inView, isLoading, shouldCallFetchMore, fetchMorePhotos]);

    return (
        <div className="p-4">
            <h1>You are viewing the album {selectedAlbum?.title} by {selectedFamilyMember?.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        ref={index === photos.length - 1 ? ref : undefined}
                    >
                        <Card
                            className="w-auto h-auto select-none"
                        >
                            <CardHeader>
                                <CardTitle>{photo.title}</CardTitle>
                                <CardDescription>{photo.id}</CardDescription>
                            </CardHeader>
                            <Avatar>
                                <AvatarImage
                                    src={photo.url.includes("via.placeholder") ? "" : photo.url}
                                    alt={photo.title}
                                />
                                <AvatarFallback>Image</AvatarFallback>
                            </Avatar>
                        </Card>
                    </div>
                ))}
                {isLoading && (
                    <div className="col-span-full text-center">
                        <span>Loading more photos...</span>
                    </div>
                )}
            </div>
        </div>
    );
}
