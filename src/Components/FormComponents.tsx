import { useForm } from "react-hook-form";
import InputField from "../Atoms/InputFiled";
import { type RegisterOptions } from "react-hook-form";
import UniversalModal from "../Modals/UniversalModal";
import Buttons from "../Atoms/Buttons";
import FileUpload from "../Atoms/FileUpload";
import { useUsers } from "../Store/Store";
import { Alert, Flex, Spin } from "antd";

interface FormField {
  entity_type: string;
  entity_label: string;
  entity_Field: string;
  placeHolder: string;
  validations: RegisterOptions;
}
const FormComponents = () => {
  const { control, handleSubmit, reset } = useForm();
  const createUserState = useUsers((state: any) => state.createUser);
  const loadingForCreate = useUsers((state: any) => state.loading);

  const onsubmit = (data: any) => {
    const fileName = data?.avatar[0]?.response?.filename;
    data.avatar = `https://api.escuelajs.co/api/v1/files/${fileName}`;
    createUserState(data);
    if (!loadingForCreate) {
      reset();
    }
  };

  const formFieldData = [
    {
      entity_type: "text",
      entity_label: "Name",
      entity_Field: "name",
      placeHolder: "Enter name",
      validations: {
        required: "Name is required",
        minLength: { value: 2, message: "Name must be at least 2 characters" },
      },
    },
    {
      entity_type: "email",
      entity_label: "Email",
      entity_Field: "email",
      placeHolder: "Enter email",
      validations: {
        required: "Email is required",
        pattern: {
          value: /^\S+@\S+$/i,
          message: "Enter a valid email address",
        },
      },
    },
    {
      entity_type: "password",
      entity_label: "Password",
      entity_Field: "password",
      placeHolder: "Enter password",
      validations: {
        required: "Password is required",
        minLength: {
          value: 4,
          message: "Password must be at least 4 characters",
        },
      },
    },
    {
      entity_type: "file",
      entity_label: "Avatar URL",
      entity_Field: "avatar",
      placeHolder: "Enter avatar image URL",
      validations: {
        required: "Avatar URL is required",
        pattern: {
          value: /^https?:\/\/.+$/i,
          message: "Enter a valid URL (http or https)",
        },
      },
    },
  ];

  return (
    <>
      <UniversalModal modalSize="xl" modalTitle="Create User">
        <form onSubmit={handleSubmit(onsubmit)}>
          {formFieldData.map((ele: FormField) => {
            if (ele?.entity_type == "file") {
              return (
                <FileUpload
                  control={control}
                  placeholder={ele.placeHolder}
                  fieldKey={ele.entity_Field}
                  label={ele.entity_label}
                  validation={ele.validations}
                />
              );
            }
            return (
              <InputField
                control={control}
                placeholder={ele.placeHolder}
                fieldKey={ele.entity_Field}
                label={ele.entity_label}
                validation={ele.validations}
              />
            );
          })}

          <Buttons htmlType="submit" label="Submit" myOnClick={() => {}} />
        </form>
        <Flex gap="middle" vertical>
          <Spin spinning={loadingForCreate}>
            {/* <Alert
          type="info"
          message="Alert message title"
          description="Further details about the context of this alert."
        /> */}
          </Spin>
        </Flex>
      </UniversalModal>
    </>
  );
};

export default FormComponents;
