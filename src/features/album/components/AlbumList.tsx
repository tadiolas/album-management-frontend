import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAlbumList } from "../hooks/useAlbumList";
import { useGlobalState } from "@/shared/GlobalStateProvider";
import { Button } from "@/components/ui/button";
import { useFamilyList } from "@/features/family/hooks/useFamilyList";
import { Eye, Trash } from "lucide-react";
import { DialogNewAlbum } from "./DialogNewAlbum";

export function AlbumList() {
    const { handleAlbumClick } = useAlbumList();
    const { selectedFamilyMember, allAlbums } = useGlobalState();
    const { identifyIfUserIsFamilyMember } = useFamilyList();
    
    return (
        <div className="p-4">
            <DialogNewAlbum />
            <p>
                You are viewing{" "}
                {identifyIfUserIsFamilyMember(selectedFamilyMember!)
                    ? "your "
                    : selectedFamilyMember?.name + "'s"}{" "}
                albums
            </p>
            <p>Click into one of the albums below to see the photos</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {allAlbums.map((album, index) => (
                    <div key={index} className="flex justify-center">
                        <Card className="w-64 h-70 select-none">
                            <CardHeader>
                                <CardTitle>{album.title}</CardTitle>
                                <CardDescription>{album.id}</CardDescription>
                            </CardHeader>
                            <CardFooter className="flex flex-col items-center justify-between gap-2">
                                <Button className="w-full mb-2 cursor-pointer">
                                    <Trash className="w-8 h-8" />
                                    <span>Delete album</span>
                                </Button>
                                <Button className="w-full mb-2 cursor-pointer" onClick={() => handleAlbumClick(album)}>
                                    <Eye className="w-8 h-8" />
                                    <span>View album</span>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
