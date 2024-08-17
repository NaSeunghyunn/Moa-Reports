export const openModal = (id: string) => {
  const modalElement = document.getElementById(id) as HTMLDialogElement;
  if (modalElement) {
    modalElement.showModal();
  }
};
