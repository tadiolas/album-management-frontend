
import { useGlobalState } from "@/shared/GlobalStateProvider";
import { getAllUsers } from "../services/familyService";
import { User } from "@/shared/model";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

export function useFamilyList() {
    const [familyMembers, setFamilyMembers] = useState<User[]>([]);
    const { user, setSelectedFamilyMember } = useGlobalState();
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers()
            .then(users => {
                setFamilyMembers([user!, ...users.filter(u => u.id !== user!.id)]);
            })
            .catch(err => {
                toast.error("Error fetching users");
                console.error("Error fetching users:", err);
            });
    }, []);

    function handleFamilyMemberClick(member: User) {
        setSelectedFamilyMember(member);
        navigate(`/album/${member.id}`);
    }

    function identifyIfUserIsFamilyMember(member: User) {
        return user!.id === member.id;
    }

    return { familyMembers, identifyIfUserIsFamilyMember, handleFamilyMemberClick };
}