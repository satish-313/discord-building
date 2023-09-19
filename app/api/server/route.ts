import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", {
                status: 401,
            });
        }

        let uuid = crypto.randomUUID();

        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuid,
                channels: {
                    create: [{ name: "general", profileId: profile.id }],
                },
                members: {
                    create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("server post");
        console.log(error);
        return new NextResponse("internal error", {
            status: 500,
        });
    }
}
