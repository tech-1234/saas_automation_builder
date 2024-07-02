"use client";

import { env } from "@/../env.mjs";
import * as LR from "@uploadcare/blocks";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

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
    ctxProviderRef.current?.addEventListener(
      "file-upload-success",
      handleUpload
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <lr-config ctx-name="my-uploader" pubkey="a9428ff5ff90ae7a64eb" />

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`${env.NEXT_PUBLIC_UPLOAD_CARE_CSS_SRC}${LR.PACKAGE_VERSION}${env.NEXT_PUBLIC_UPLOAD_CARE_SRC_PACKAGE}`}
      />

      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />
    </div>
  );
};

export default UploadCareButton;
