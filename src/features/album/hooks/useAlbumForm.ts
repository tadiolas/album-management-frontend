import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    title: z.string().min(1, {
        message: "title is required.",
    }),
    album: z.string().min(1, {
        message: "album is required.",
    }),
})

export function useAlbumForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            album: "",
        },
    });


    return { form };
}