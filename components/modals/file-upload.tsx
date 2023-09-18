"use client";
import { UploadDropzone, UploadButton } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";

type fileUploadProps = {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
};

export const FileUpload: React.FC<fileUploadProps> = ({
    endpoint,
    onChange,
    value,
}) => {
    const fileType = value?.split(".").pop();
    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image fill src={value} alt="upload" className="rounded-full" />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 rigth-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }
    return (
        <>
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    // console.log("Files: ", res);
                    onChange(res?.[0].url);
                    // alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    console.log(error);
                    // alert(`ERROR! ${error.message}`);
                }}
            />
        </>
    );
};
