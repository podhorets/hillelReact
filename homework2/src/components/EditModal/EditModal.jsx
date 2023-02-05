import { Component } from "react";
import "./EditModal.css";

class EditModal extends Component {
  render() {
    return (
      <div className="modal" onClick={this.props.onClose}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Edit title</h4>
          </div>
          <div className="modal-body">
            <textarea
              rows="4"
              cols="50"
              type="text"
              value={this.props.title}
              onChange={(event) => {
                this.props.updateTitle(event.target.value);
              }}
            />
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                this.props.editPost(this.props.id);
              }}
              className="button"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditModal;
