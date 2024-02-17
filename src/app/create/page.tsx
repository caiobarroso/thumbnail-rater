"use client";

import { useMutation } from "convex/react";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import { api } from "../../../convex/_generated/api";

import "@xixixao/uploadstuff/react/styles.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CreatePage() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.thumbnails.createThumbnail);

  const [imageA, setImageA] = useState("");
  const [imageB, setImageB] = useState("");

  return (
    <div className="mt-16">
      <h1 className="text-4xl font-bold mb-8">Create a thumbnail test</h1>
      <p className="text-lg max-w-md mb-8">
        Create a test so that can other people vote on their favorite thumbnail
        and help you redesign or pick the best option.
      </p>

      <form className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold">Test image A</h2>
          {imageA && (
            <Image
              width="200"
              height="200"
              alt="image a"
              src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${imageA}`}
            />
          )}
          <UploadButton
            uploadUrl={generateUploadUrl}
            fileTypes={["image/*"]}
            onUploadComplete={async (uploaded: UploadFileResponse[]) => {
              setImageA((uploaded[0].response as any).storageId);
            }}
            onUploadError={(error: unknown) => {
              alert(`ERROR! ${error}`);
            }}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Test image B</h2>
          {imageB && (
            <Image
              width="200"
              height="200"
              alt="image a"
              src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${imageB}`}
            />
          )}
          <UploadButton
            uploadUrl={generateUploadUrl}
            fileTypes={["image/*"]}
            onUploadComplete={async (uploaded: UploadFileResponse[]) => {
              setImageB((uploaded[0].response as any).storageId);
            }}
            onUploadError={(error: unknown) => {
              alert(`ERROR! ${error}`);
            }}
          />
        </div>

        <Button>Create thumbnail test</Button>
      </form>
    </div>
  );
}
