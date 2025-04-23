import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFamilyList } from "../hooks/useFamilyList";

export function FamilyList() {
    const { familyMembers, identifyIfUserIsFamilyMember, handleFamilyMemberClick } = useFamilyList();

    return (
        <div className="p-4">
            <p>Click a family member to see their albums</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {familyMembers.map((member, index) => (
                    <div key={index} className="flex justify-center">
                        <Card
                            className="w-64 h-40 cursor-pointer select-none hover:bg-gray-800 hover:text-white transition-colors"
                            onClick={() => handleFamilyMemberClick(member)}
                        >
                            <CardHeader>
                                <CardTitle>{identifyIfUserIsFamilyMember(member) ? '(You) ' : ''} {member.name}</CardTitle>
                                <CardDescription>{member.email}</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
