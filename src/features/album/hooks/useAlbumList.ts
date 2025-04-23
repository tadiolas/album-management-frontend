import { Album } from "@/shared/model";
import { useEffect, useState } from "react";
import { getAllAlbumsByUserId } from "../services/albumService";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "@/shared/GlobalStateProvider";
import { toast } from "sonner";

export function useAlbumList() {
    const { setSelectedAlbum, setAllAlbums } = useGlobalState();
    const [selectedAlbumCombo, setSelectedAlbumCombo] = useState<Album>();
    const navigate = useNavigate();
    const { id } = useParams();

    if (!id) {
        toast.error("No userId found in URL parameters.");
    }

    function getAllAlbumsById(id: string) {
        getAllAlbumsByUserId(id)
            .then((albums) => {
                setAllAlbums(albums);  
            })
            .catch((err) => {
                toast.error("Error fetching album");
                console.error("Error fetching album:", err);
            });
    }

    useEffect(() => {
        if (id) {
            getAllAlbumsById(id);  
        }
    }, [id]);

    function handleAlbumClick(album: Album) {
        setSelectedAlbum(album);
        navigate(`/album/${album.id}/photos`);
    }

    function addAlbum(album: Album) {
        setAllAlbums((prevAlbums) => [...prevAlbums, album]); 
        console.log("Album added:", album);
    }

    return { selectedAlbumCombo, addAlbum, setSelectedAlbumCombo, handleAlbumClick };
}