import { useForm } from "react-hook-form";
import InputField from "../Atoms/InputFiled";
import { type RegisterOptions } from "react-hook-form";
import UniversalModal from "../Modals/UniversalModal";
import Buttons from "../Atoms/Buttons";

interface FormComponentsPropType {
  handleSubmission: (data: any) => void;
}

interface FormField {
  entity_label: string;
  entity_Field: string;
  placeHolder: string;
  validations: RegisterOptions;
}
const FormComponents = ({ handleSubmission }: FormComponentsPropType) => {
  const { control, handleSubmit } = useForm();

  const onsubmit = (data: any) => {
    handleSubmission(data);
  };

  const formFieldData = [
    {
      entity_label: "Name",
      entity_Field: "name",
      placeHolder: "Enter name",
      validations: {
        required: "Name is required",
        minLength: { value: 2, message: "Name must be at least 2 characters" },
      },
    },
    {
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
          {formFieldData.map((ele: FormField) => (
            <InputField
              control={control}
              placeholder={ele.placeHolder}
              fieldKey={ele.entity_Field}
              label={ele.entity_label}
              validation={ele.validations}
            />
          ))}
          <Buttons htmlType="submit" label="Submit" myOnClick={() => {}} />
        </form>
      </UniversalModal>
    </>
  );
};

export default FormComponents;
