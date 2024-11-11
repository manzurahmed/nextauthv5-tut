import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

// 6:39:51
export async function GET() {

	// 6:42:09
	const role = await currentRole();
	// Only ADMIN Role
	if (role === UserRole.ADMIN) {
		return new NextResponse(
			null,
			{
				status: 200
			}
		);
	}

	return new NextResponse(
		null,
		{
			status: 403
		}
	);
}