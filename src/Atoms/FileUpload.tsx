import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Typography, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Controller, type Control, type FieldValues } from "react-hook-form";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface InputFieldProps {
  placeholder?: string;
  control: Control<any>; // typed control from react-hook-form
  required?: boolean;
  label: string;
  fieldKey: string; // ensures key exists in form values
  validation?: Record<string, any>; // extra RHF validation rules
}

function FileUpload({
  placeholder = "Upload",
  control,
  required,
  label,
  fieldKey,
  validation = {},
}: InputFieldProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{placeholder}</div>
    </button>
  );

  return (
    <>
      <Controller
        name={fieldKey}
        control={control}
        rules={{
          ...(required ? { required: `${label} is required` } : {}),
          ...validation,
        }}
        render={({ field, fieldState }) => {
          const { value = [], onChange } = field;
          const { error } = fieldState;

          const handleChange: UploadProps["onChange"] = ({
            file,
            fileList,
          }) => {
            if (file.status === "done") {
              const uploadedUrl = file.response?.location;
              console.log("Uploaded file URL:", uploadedUrl);
            }

            // Update RHF state so your form keeps the list of files
            onChange(fileList);
          };

          return (
            <>
              <Typography.Title level={5}>{label}</Typography.Title>
              <Upload
                action="https://api.escuelajs.co/api/v1/files/upload"
                listType="picture-card"
                fileList={value}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {value.length >= 1 ? null : uploadButton}
              </Upload>

              {error && (
                <span style={{ color: "red", fontSize: 12 }}>
                  {error.message}
                </span>
              )}
            </>
          );
        }}
      />

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
}

export default FileUpload;
