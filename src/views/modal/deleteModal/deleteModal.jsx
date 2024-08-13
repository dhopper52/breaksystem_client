import React from "react";
import { connect } from "react-redux";

import { modalActions } from "../../../redux/actions/modal.actions/modal.actions";
import { userActions } from "../../../redux/actions/user.action/user.action";

const DeleteModal = (props) => {
  return (
    <div>
      {/* <h3> Confirm to Delete User</h3> */}
      <div className="d-flex justify-content-end pt-2">
        <button
          type="submit"
          class="btn btn-dark color-theme me-2"
          onClick={() => props.deleteUser(props.row)}
        >
          Confirm
        </button>{" "}
        <button
          type="submit"
          class="btn btn-dark color-theme ms-2"
          onClick={props.onHide}
        >
          Cancel
        </button>{" "}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  modalOpen: state?.modalReducer?.modalOpen,
});
const mapDispatchToProps = (dispatch) => ({
  handleModal: () => dispatch(modalActions.handleModal()),
  deleteUser: (data) => dispatch(userActions.deleteUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
