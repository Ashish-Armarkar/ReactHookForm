import { Button, Flex } from "antd";

interface ButtonsPropType {
  myOnClick: () => void;
  label: string;
  btnColor?:
    | "primary"
    | "danger"
    | "default"
    | "blue"
    | "purple"
    | "cyan"
    | "green"
    | "magenta"
    | "pink"
    | "red"
    | "orange"
    | "yellow"
    | "volcano"
    | "geekblue"
    | "lime"
    | "gold"
    | undefined;
  htmlType: "button" | "submit" | "reset" | undefined;
}
const Buttons = ({
  myOnClick,
  label,
  btnColor = "default",
  htmlType,
}: ButtonsPropType) => {
  return (
    <>
      <Flex vertical gap="small" style={{ width: "10%", margin: "1% 0" }}>
        <Button
          type={"primary"}
          onClick={myOnClick}
          style={{ background: `var(--${btnColor})` }}
          htmlType={htmlType}
        >
          {label}
        </Button>
      </Flex>
    </>
  );
};

export default Buttons;
