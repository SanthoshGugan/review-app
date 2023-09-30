import { Box, Container, Input, Text } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";

const RInput = (props) => {

    const { register, errors, formProps, getFieldState, type= "text" } = props;
    const { registerProps : { regId, validations }, id } = formProps;
    const { invalid } = getFieldState(id);

    return (
        <Box>
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
            <Container height="30px">
                <ErrorMessage errors={errors} name={id} style={{ fontSize: '14px'}} as={<Text />}/>
            </Container>
        </Box>
    );
};

export default RInput;

