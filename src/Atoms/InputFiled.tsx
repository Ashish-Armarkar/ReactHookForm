import { Flex, Input } from "antd";
interface InputFieldProps{
  styleOfField?: "filled"|"borderless"|"underlined"|"filled",
  placeholder:string,

}
const InputField = ({styleOfField, placeholder}:InputFieldProps) => {
  return (
    <Flex vertical gap={12}>
      <Input placeholder={placeholder} variant={styleOfField} />
    </Flex>
  );
};
export default InputField;
