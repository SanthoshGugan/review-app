import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import React from "react";
import FileUpload from "./FileUPload";

const ImportReview = (props) => {

    const { isOpen, onClose } = props;

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import Reviews</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FileUpload
                name="review-file"
                acceptedFileTypes={['csv']}
                isRequired
                children={<>Reviews File Import</>}
                control={() => {}}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Import</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
};

export default ImportReview;