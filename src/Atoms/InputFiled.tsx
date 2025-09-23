import { Controller, type Control } from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space, Flex, Typography } from "antd";
import { useState } from "react";
import NumericInput from "./NumberInput";

interface InputFieldProps {
  placeholder: string;
  control: Control<any>;
  required?: boolean;
  label: string;
  fieldKey: string;
  validation: {};
  type: string;
}

const InputField = ({
  placeholder,
  control,
  required,
  label,
  fieldKey,
  validation,
  type,
}: InputFieldProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [value, setValue] = useState("");
  const { TextArea } = Input;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e);
  };
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
          {type === "password" ? (
            <Space direction="vertical">
              <Input.Password placeholder="input password" />
              <Input.Password
                placeholder="input password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <Space direction="horizontal">
                <Input.Password
                  placeholder="input password"
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                />
                <Button
                  style={{ width: 80 }}
                  onClick={() => setPasswordVisible((prevState) => !prevState)}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </Button>
              </Space>
              <Input.Password disabled placeholder="disabled input password" />
            </Space>
          ) : type === "textarea" ? (
            <TextArea
              placeholder="textarea with clear icon"
              allowClear
              onChange={onChange}
            />
          ) : type === "number" ? (
            <NumericInput
              style={{ width: 120 }}
              value={value}
              onChange={setValue}
            />
          ) : (
            <Flex vertical gap={8}>
              <Input
                {...field}
                placeholder={placeholder}
                status={error ? "error" : ""}
              />
            </Flex>
          )}
          {error && (
            <span style={{ color: "red", fontSize: 12 }}>{error.message}</span>
          )}
        </>
      )}
    />
  );
};

export default InputField;
