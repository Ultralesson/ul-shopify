import React from "react";
import CustomQuitActionModal from "../components/common/CustomQuitActionModal";
import { selectQuitActionModalState } from "../store/slices/modalsSlice";

const OtpQuitModal = () => {
    return (
        <CustomQuitActionModal selector={selectQuitActionModalState} positiveActonText="Yes" negativeActionText="No" />
    );
};

export default OtpQuitModal;
