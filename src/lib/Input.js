import React from "react";
import { Box, Button, Container, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";

const RInput = (props) => {

    const { register, errors, formProps, getFieldState, type= "text" } = props;
    const { registerProps : { regId, validations }, id } = formProps;
    const { invalid } = getFieldState(id);


    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const getInputType = () => {
        if (id !== "password") return type;
        if (show) return "text";
        return type;
    }

    const renderField = () => {
        if (id == "password") {
            return (
                <>
                    <Input
                        variant="flushed"
                        {
                            ...register(regId, {
                                ...validations
                            })
                        }
                        style={{ fontSize: '18px'}}
                        {
                            ...formProps
                        }
                        isInvalid={invalid}
                        {
                            ...props
                        }
                        type={show ? "text" : "password"}
                    />
                    <InputRightElement>
                        <Button size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </>
            )
        }
        return (
            <Input
                    variant="flushed"
                    {
                        ...register(regId, {
                            ...validations
                        })
                    }
                    style={{ fontSize: '18px'}}
                    {
                        ...formProps
                    }
                    isInvalid={invalid}
                    {
                        ...props
                    }
                    type={type}
                />
        );
    };


    return (
        <Box>
            <InputGroup>
                {renderField()}
                </InputGroup>
                <Container height="30px">
                    <ErrorMessage errors={errors} name={id} style={{ fontSize: '14px'}} as={<Text />}/>
                </Container>
        </Box>
    );
};

export default RInput;

