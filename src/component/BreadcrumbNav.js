import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";

const BreadcrumbNav = ({ navs = []}) => {

    const renderNavItem = (nav) => {
        const { url, label } = nav;
        return (
            <BreadcrumbLink href={url || '#'}>{label || "nav"}</BreadcrumbLink>
        )
    };

    const renderNavItems = () => {
        return navs.map((nav, index) => (
            <BreadcrumbItem key={index}>
                {renderNavItem(nav)}
            </BreadcrumbItem>)
        );
    }
    
    return (
        <Breadcrumb>
            {renderNavItems()}
        </Breadcrumb>
    );
};

export default BreadcrumbNav;