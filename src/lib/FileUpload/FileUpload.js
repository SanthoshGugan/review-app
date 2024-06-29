import { Button } from "@chakra-ui/react";
import React from "react";


const FileUpload = ({ onUpload, id, btnText = "upload", accept=".csv" }) => {

    const input_id = `__rf__file_picker__${id}`;

    const onFileChange = async (event) => {
        const file = event.target.files[0];
        await onUpload({ file });
    };

    const onContainerClick = (e) => {
        // e.preventDefault();
        document.getElementById(input_id).click();
    }

    return (
        <div>
            <Button onClick={onContainerClick}>
                {btnText}
            </Button>
            <input 
                accept={accept}
                type="file"
                onChange={onFileChange}
                id={input_id}
                hidden
            />
        </div>
    )
};

export default FileUpload;