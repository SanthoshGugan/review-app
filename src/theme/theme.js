import { extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";

const theme = extendTheme({
    components: {
        MultiSelect: MultiSelectTheme
    }
});

export default theme;