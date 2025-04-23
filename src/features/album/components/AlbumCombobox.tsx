import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useGlobalState } from "@/shared/GlobalStateProvider";

export function AlbumCombobox({
    value,
    onChange,
}: {
    value: string; 
    onChange: (value: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const { allAlbums } = useGlobalState();

    const albumsList = [
        {
            value: "0",
            label: "Create new album",
        },
        ...allAlbums.map((album) => ({
            value: album.id.toString(),
            label: album.title,
        })),
    ];
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? albumsList.find((alb) => alb.value === value)?.label
                        : "Select album..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search album..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No album found.</CommandEmpty>
                        <CommandGroup>
                            {albumsList.map((alb) => (
                                <CommandItem
                                    key={alb.value}
                                    value={alb.value}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {alb.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === alb.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
