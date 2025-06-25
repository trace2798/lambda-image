"use server";

import { db } from "@/db";
import { workspace } from "@/db/schema";
import { nanoid } from "nanoid";

export async function createWorkspace(userId: string, title: string) {
  const publicId = nanoid();
  const response = await db
    .insert(workspace)
    .values({
      publicId: publicId,
      userId: userId,
      title: title,
      updatedAt: new Date(),
      createdAt: new Date(),
    })
    .returning({ id: workspace.id });
  console.log(response);
  return {
    id: response[0].id,
    status: 200,
  };
}
