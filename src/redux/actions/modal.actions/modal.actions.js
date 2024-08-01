import { modalConstants } from "../../../system/constants/globleConstants/globleConstants";
export const handleModal = () => {
  return async (dispatch) => {
    dispatch({
      type: modalConstants.ModalOpen,
    });
  };
};

export const handleSearchModal = () => {
  return async (dispatch) => {
    dispatch({
      type: modalConstants.SEARCH_MODAL,
    });
  };
};

export const modalActions = {
  handleModal,
  handleSearchModal,
};
