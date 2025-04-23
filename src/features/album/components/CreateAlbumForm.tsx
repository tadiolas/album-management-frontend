import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlbumCombobox } from "./AlbumCombobox";
import { useEffect } from "react";

export function AlbumForm({ form }: { form: any }) {
    const selectedAlbum = form.watch("album");

    useEffect(() => {
        console.log(selectedAlbum)
        if (selectedAlbum !== "0") {
            form.setValue("title", "");
        }
    }, [selectedAlbum]);

    return (
        <Form {...form}>
            <form className="space-y-8">
                <FormField
                    control={form.control}
                    name="album"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Album</FormLabel>
                            <FormControl>
                                <AlbumCombobox
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {selectedAlbum === "0" && (
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
            </form>
        </Form>
    );
}
