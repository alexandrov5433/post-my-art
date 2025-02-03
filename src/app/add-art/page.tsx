import { redirect } from "next/navigation";

import { getUserIDFromSessionCookie } from "@/lib/actions/session";
import { fetchUserData } from "@/lib/data";

import NavBar from "@/ui/nav/nav";
import AddArt from "@/ui/addArt/addArt";
import { UserData } from "@/lib/definitions";

export default async function AddArtPage() {
    const userIDSession: string | null = await getUserIDFromSessionCookie();
    if (!userIDSession) return redirect('/home');
    const userData: UserData | null = await fetchUserData(userIDSession);
    if (!userData) return redirect('/home');

    return (
        <>
            <NavBar userData={userData}></NavBar>
            <AddArt userData={userData}></AddArt>
        </>
    );
}