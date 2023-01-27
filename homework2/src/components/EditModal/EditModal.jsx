import { Component } from "react";
import "./EditModal.css";

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
    };
  }

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
              value={this.state.title}
              onChange={(e) => {
                this.setState({ title: e.target.value });
              }}
            />
          </div>
          <div className="modal-footer">
            <button
              onClick={() => {
                this.props.editTitle(this.state.title);
                this.props.hideModal();
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
