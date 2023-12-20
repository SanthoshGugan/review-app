import React, { useEffect, useState } from "react";
import Upload from "rc-upload";


const UploadReviewPicture = (props) => {

    const { 
        onUploadSuccess, 
        uploadReviewUrlConstructor,
        uploadReviewHeaders,
        onUploadError
    } = props;


    return (
        <>
            <Upload
                multiple={false}
                accept="image/png"
                onSuccess={onUploadSuccess}
                action={uploadReviewUrlConstructor()}
                headers={uploadReviewHeaders()}
                onError={onUploadError}
            >
                <div>Upload Picture</div>
            </Upload>
        </>
    );
};

export default UploadReviewPicture;
