import React from "react";
import { useNavigate } from "react-router-dom";
import { SidebarIcon } from "./styles";

export function IconsOptions({ Icon, text, to }) {
    const navigate = useNavigate();

    return (
        <SidebarIcon onClick={() => navigate(to)}>
            <Icon className="MuiSvgIcon-root" />
            <h2>{text}</h2>
        </SidebarIcon>
    );
}

