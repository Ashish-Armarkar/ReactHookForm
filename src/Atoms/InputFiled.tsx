import { Flex, Input, Typography } from "antd";
import { Controller, type Control } from "react-hook-form";

interface InputFieldProps {
  placeholder: string;
  control: Control<any>; // or Control<FormValues> if you have a type
  required?: boolean;
  label: string;
  fieldKey: string;
  validation: {};
}

const InputField = ({
  placeholder,
  control,
  required,
  label,
  fieldKey,
  validation,
}: InputFieldProps) => {
  return (
    <Controller
      name={fieldKey}
      control={control}
      rules={{
        ...(required ? { required: `${label} is required` } : {}),
        ...validation,
      }}
      render={({ field, fieldState: { error } }) => (
        <>
          <Typography.Title level={5}>{label}</Typography.Title>
          <Flex vertical gap={8}>
            <Input
              {...field}
              placeholder={placeholder}
              status={error ? "error" : ""} // AntD v5 shows red border
            />
            {error && (
              <span style={{ color: "red", fontSize: 12 }}>
                {error.message}
              </span>
            )}
          </Flex>
        </>
      )}
    />
  );
};

export default InputField;
