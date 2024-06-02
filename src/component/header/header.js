import { Box, Flex, IconButton, Text, Tooltip, Icon } from "@chakra-ui/react";
import React from "react";
import { AiOutlineInfo } from "react-icons/ai";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { FaFaceGrinStars } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";

import "./header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = ({
  customer_sid
}) => {

  const navigate = useNavigate();

  const renderLink = (url, text, iconRender) => {

    return (
      <Tooltip label={text} size="md">
          <IconButton
            icon={iconRender}
            variant="ghost"
            onClick={() =>  navigate(url)}
          />
      </Tooltip>

    );
  }

    return (
        <Box 
          as="header" 
          className="header"
        >
          <Flex justifyContent="space-between" alignItems="center" h="100%" px="2rem">
            {/* Left side: Brand Name and Logo */}
            <Box>
              <Text fontWeight="bold">The Review Factor</Text>
            </Box>
            <Flex gap="1rem">
                {/* <Tooltip label="Onboard" size="md">
                  <NavLink href={`/${customer_sid}/onboard`}>
                    <IconButton
                      icon={<HiOutlineRocketLaunch />}
                      variant="ghost"
                    />
                  </NavLink>
                </Tooltip> */}
              
              {renderLink(
                `/${customer_sid}/onboard`,
                "Onboard",
                <HiOutlineRocketLaunch />
              )}
              {renderLink(
                `/${customer_sid}/reviews`,
                "Reviews",
                <FaFaceGrinStars />
              )}
              {renderLink(
                `/${customer_sid}/users`,
                "Users",
                <FiUsers />
              )}



              {/* <Tooltip label="Reviews" size="md">
                  <Link href={`/${customer_sid}/reviews`}>
                    <IconButton
                      icon={<FaFaceGrinStars />}
                      variant="ghost"
                    />
                  </Link>
              </Tooltip>
              <Tooltip label="Users" size="md">
                <Link href={`/${customer_sid}/users`}>
                  <IconButton
                    icon={<FiUsers />}
                    variant="ghost"
                  />
                </Link>
              </Tooltip> */}
            </Flex>
          </Flex>
        </Box>);
};

export default Header;