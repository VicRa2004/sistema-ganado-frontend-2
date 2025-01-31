import { useModalStore } from "../store/modal_store";

const useModal = () => {
  const setModalType = useModalStore((state) => state.openModal);
  const close = useModalStore((state) => state.closeModal);
  const modalType = useModalStore((state) => state.modalType);

  const openModal = (type: string) => setModalType(type);
  const closeModal = () => close();

  return { modalType, openModal, closeModal };
};

export default useModal;
