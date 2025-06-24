import { ImageUploader } from "@/components/image-uploader";
import { ImageUploaderLocal } from "@/components/image-uploader-local";
import { db } from "@/db";

export default async function Home() {
  const users = await db.query.user.findMany();
  console.log(users);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ImageUploader />
      <ImageUploaderLocal />
    </div>
  );
}

// aws logs tail "/aws/amplify/d2k7qje6c3xraz" --log-stream-name-prefix "master" --since 5m --follow --region ap-south-1
