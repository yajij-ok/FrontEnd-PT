import React from "react";
import { SiTicktick } from "react-icons/si";

const SuccessModal = ({ show, onClose, title, message, onAction }) => {
  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-3">
          {/* Header */}
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">
              <i className="bi bi-check-circle-fill me-2"></i> Success
            </h5>
          </div>

          {/* Body */}
          <div className="modal-body text-center">

            <div class="tick-icon fs-1 mb-2">
                <SiTicktick className="text-success"/>
            </div>

            <h3 className="fw-bold">{title}</h3>
            <p className="text-muted" style={{fontSize : "17px"}}>{message}</p>
            <button
              className="btn btn-warning rounded-pill px-4 mt-3"
              onClick={onAction}
            >
              Back to shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
