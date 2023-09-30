export const getInputFormProps = ({ id, placeholder , isRequired, minLength, maxLength, patternReg }) => {
    const formProps = {
        id, 
        placeholder
    };

    const registerProps = {
        regId: id,
    }

    const required = isRequired ? {
        required: "This is required"
        } : {};
    const minLengthProp = minLength ? {
        minLength: {
            value: minLength,
            message: `Minimum length should be ${minLength}.`
        }
    } : {};

    const maxLengthProps = maxLength ? {
        maxLength: {
            value: maxLength,
            message: `Maximum length should be ${maxLength}`
        }
        } : {};
    const pattern = patternReg ? {
        pattern: patternReg
    } : {};

    return {
        ...formProps,
        registerProps: {
            ...registerProps,
            validations: {
                ...required,
                ...minLengthProp,
                ...maxLengthProps,
                ...pattern
            }
        }
    };
};

export const getButtonFormProps = ({ 
    isSubmit = true,
    isLoading = false,
    isDisabled = false,
    colorScheme = "teal",
    size="lg"
}) => {
    const typeProps = isSubmit ? {
        type: "submit"
    } : {};

    return {
        ...typeProps,
        isLoading,
        isDisabled,
        colorScheme,
        size
    }
};