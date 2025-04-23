import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ImageUp } from "lucide-react";
import { useRef, useState } from "react";
import { useAlbumForm } from "../hooks/useAlbumForm";
import { AlbumForm } from "./CreateAlbumForm";
import { useAlbumList } from "../hooks/useAlbumList";
import { Album } from "@/shared/model";
import { useGlobalState } from "@/shared/GlobalStateProvider";

export function DialogNewAlbum() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { form } = useAlbumForm();
    const { addAlbum } = useAlbumList();
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const { user } = useGlobalState();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file.name);
        }
    };

    const handleOpenFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleAddPhoto = () => {
        const formData = form.getValues();
        if (formData.title) {
            const alb: Album = { id: 0, title: formData.title, userId: user!.id };
            addAlbum(alb);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                    <ImageUp className="w-8 h-8" />
                    <span>Add new photo</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Insert a new photo</AlertDialogTitle>
                    <AlertDialogDescription>
                        Select the photo and the album you want to add it to. You can also create a new album.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col gap-4">
                    <Button variant="outline" onClick={handleOpenFilePicker}>
                        Select a photo
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    {selectedFile && (
                        <p className="text-sm text-gray-600">
                            Selected file: <strong>{selectedFile}</strong>
                        </p>
                    )}
                </div>
                <div>
                    <AlbumForm form={form} />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="cursor-pointer"
                        onClick={handleAddPhoto}
                    >
                        Add photo
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
