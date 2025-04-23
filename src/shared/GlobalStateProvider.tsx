import React, { createContext, useContext, useEffect, useState } from "react";
import { Album, User } from "./model";

interface GlobalState {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    selectedFamilyMember: User | null;
    setSelectedFamilyMember: React.Dispatch<React.SetStateAction<User | null>>;
    selectedAlbum: Album | null;
    setSelectedAlbum: React.Dispatch<React.SetStateAction<Album | null>>;
    allAlbums: Album[] | [];
    setAllAlbums: React.Dispatch<React.SetStateAction<Album[] | []>>;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [selectedFamilyMember, setSelectedFamilyMember] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("selectedFamilyMember");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(() => {
        const storedUser = localStorage.getItem("selectedAlbum");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [allAlbums, setAllAlbums] = useState<Album[] | []>([]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    useEffect(() => {
        if (selectedFamilyMember) {
            localStorage.setItem("selectedFamilyMember", JSON.stringify(selectedFamilyMember));
        } else {
            localStorage.removeItem("selectedFamilyMember");
        }
    }, [selectedFamilyMember]);

    useEffect(() => {
        if (selectedAlbum) {
            localStorage.setItem("selectedAlbum", JSON.stringify(selectedAlbum));
        } else {
            localStorage.removeItem("selectedAlbum");
        }
    }, [selectedAlbum]);

    return (
        <GlobalStateContext.Provider value={{
            user, setUser,
            selectedFamilyMember, setSelectedFamilyMember,
            selectedAlbum, setSelectedAlbum,
            allAlbums, setAllAlbums
        }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }
    return context;
};