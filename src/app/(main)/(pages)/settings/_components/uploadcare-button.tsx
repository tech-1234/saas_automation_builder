"use client";
import React, { useEffect, useRef } from "react";
import * as LR from "@uploadcare/blocks";
import "@uploadcare/react-uploader/core.css";
import { useRouter } from "next/navigation";

type Props = {
  onUpload: (e: string) => any;
};

LR.registerBlocks(LR);

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null);

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl);
      if (file) {
        router.refresh();
      }
    };
    const currentRef = ctxProviderRef.current;

    if (currentRef) {
      currentRef.addEventListener("file-upload-success", handleUpload);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("file-upload-success", handleUpload);
      }
    };
  }, [onUpload, router]);

  return (
    <div>
      <lr-config ctx-name="my-uploader" pubkey="4af769b0724b38b1072b" />

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.44.0/web/lr-file-uploader-regular.min.css`}
      />

      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />
    </div>
  );
};

export default UploadCareButton;
