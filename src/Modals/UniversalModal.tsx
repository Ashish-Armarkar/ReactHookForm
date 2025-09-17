import { type ReactNode } from "react";
import { Modal } from "antd";
import { useModalStore, type useModalStoreType } from "../Store/Store";

interface UniversalModalProps {
  children: ReactNode;
  modalSize?: "sm" | "md" | "lg" | "xl" | "xxl";
  modalTitle: string;
}

const UniversalModal = ({
  children,
  modalSize = "md",
  modalTitle,
}: UniversalModalProps) => {
  const modalWidth = {
    sm: "35%",
    md: "50%",
    lg: "70%",
    xl: "90%",
    xxl: "100%",
  };
  const openModal: boolean = useModalStore(
    (state: useModalStoreType) => state.isOpenModal
  );
  const loading: boolean = useModalStore(
    (state: useModalStoreType) => state.isLoading
  );
  const closeModal: () => void = useModalStore(
    (state: useModalStoreType) => state.closeModal
  );
  return (
    <>
      <Modal
        title={<p>{modalTitle}</p>}
        footer={<></>}
        loading={loading}
        open={openModal}
        onCancel={() => closeModal()}
        width={`${modalWidth[`${modalSize}`]}`}
        style={{ top: "5%" }}
      >
        {children}
      </Modal>
    </>
  );
};

export default UniversalModal;
