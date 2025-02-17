import { redirect } from "next/navigation";

import { getUserIDFromSessionCookie } from "@/lib/actions/session";

import NavBar from "@/ui/nav/nav";
import Footer from "@/ui/footer/footer";
import AddArt from "@/ui/addArt/addArt";

export default async function AddArtPage() {
    const userIDSession: string | null = await getUserIDFromSessionCookie();
    if (!userIDSession) return redirect('/home');

    return (
        <>
            <NavBar></NavBar>
            <AddArt></AddArt>
            <Footer></Footer>
        </>
    );
}