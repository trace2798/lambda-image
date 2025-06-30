"use server";

import { db } from "@/db";
import { image, workspace } from "@/db/schema";
import { eq } from "drizzle-orm";
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
  //console.log(response);
  return {
    id: response[0].id,
    status: 200,
  };
}

export async function addAltToImage(publicId: string, alt: string) {
  const [updatedRow] = await db
    .update(image)
    .set({
      alt,
      updatedAt: new Date(),
    })
    .where(eq(image.publicId, publicId))
    .returning({ id: image.id });

  //console.log("Drizzle update response:", updatedRow);

  return {
    id: updatedRow.id,
    status: 200,
  };
}
