import { toast } from "sonner"

export async function getJsonPlaceholderGeneric(api: string): Promise<[]> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${api}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        toast.error("Network response was not ok");
    }
    return await (response.json() as Promise<[]>);
}

export async function getRandomDogGeneric(): Promise<{ message: string, status: string }> {
    const response = await fetch(`https://dog.ceo/api/breeds/image/random`, {
        method: "GET",
        referrerPolicy: "no-referrer",
        mode: "cors",
    });
    if (!response.ok) {
        toast.error("Network response was not ok");
    }

    return await (response.json() as Promise<{ message: string, status: string }>);
}
