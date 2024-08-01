import { modalConstants } from "../../../system/constants/globleConstants/globleConstants";
const initialState = {
  modalOpen: false,
  searchModal: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case modalConstants.ModalOpen:
      return {
        ...state,
        modalOpen: !state.modalOpen,
      };
    case modalConstants.SEARCH_MODAL:
      return {
        ...state,
        searchModal: !state.searchModal,
      };

    default:
      return state;
  }
};
export default modalReducer;
