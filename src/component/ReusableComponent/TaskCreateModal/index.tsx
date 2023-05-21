import React, { ChangeEvent, useState } from "react";
import { Input, Modal } from "antd";

interface Props {
  taskDataHandler: (e: string) => void;
  openModal: boolean;
  setOpenModal: (e: boolean) => void;
}

const TaskCreateModal = ({
  taskDataHandler,
  openModal,
  setOpenModal,
}: Props) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState(false);

  const validationHandler = () => {
    if (!title.trim()) {
      setError(true);
      return true;
    }
  };

  const okHandler = () => {
    setError(false);
    const validate = validationHandler();

    if (!validate) {
      taskDataHandler(title);
      setTitle("");
      setOpenModal(false);
    }
  };

  const onCancelHandler = () => {
    setTitle("");
    setOpenModal(false);
    setError(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setTitle(e.target.value);
  };

  return (
    <>
      <Modal
        title="Create a new Task"
        centered
        open={openModal}
        onOk={okHandler}
        onCancel={onCancelHandler}
      >
        <Input
          value={title}
          placeholder="Please provide task for title"
          onChange={onChangeHandler}
        />
      </Modal>
    </>
  );
};

export default TaskCreateModal;
