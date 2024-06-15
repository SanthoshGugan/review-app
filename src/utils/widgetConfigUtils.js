export const getConfigByName = ({ configs, group }) => {
    const may_be_config = configs.filter(config => {
        const { group: actual_group } = config;
        return group === actual_group;
    });
    return may_be_config.length ? may_be_config[0] : {};
};

export const getInitialStarConfig = ({ config, configBuilder }) => {
    const { stars } = config;

    const stars_str = stars.map(star => star.toString());
    const star_group = getConfigByName({ configs: configBuilder, group : "stars" });
    const { fields } = star_group;
    const [star_field] = fields;
    const { options = [] } = star_field;

    return options.filter(option => {
        const { value } = option;
        return stars_str.includes(value);
    });
}