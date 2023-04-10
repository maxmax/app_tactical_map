import React from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { Link } from "react-router-dom";


interface GroupBarProps extends BoxProps {
  // children?: React.ReactNode;
}

const GroupBarStyled = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 2,
  padding: theme.spacing(2),
}));

const MenuStyled = styled(Box)<BoxProps>(({ theme }) => ({
  width: 250
}));

// const StyledAppBase = styled.a`
//  padding: 4px 5px,
// `;

export function GroupBar({
  ...other
}: GroupBarProps) {
  const [drawerState, setDrawerState] = React.useState(false);
  const [openPlanetList, setOpenPlanetList] = React.useState(false);

  const toggleDrawer = () => setDrawerState(!drawerState);

  const togglePlanetList = () => setOpenPlanetList(!openPlanetList);

  console.log('_____________D__________SSSS_');

  return (
    <GroupBarStyled {...other}>
      <IconButton
        color="primary"
        aria-label="Settings"
        component="span"
        onClick={toggleDrawer}
      >
        <SettingsIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerState}
        onClose={toggleDrawer}
      >
        <MenuStyled>
          <List>
            <ListItemButton onClick={togglePlanetList}>
              <ListItemIcon>
                <Brightness1Icon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
              {openPlanetList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openPlanetList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Brightness1Icon />
                  </ListItemIcon>
                  <ListItemText primary="Under construction" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Brightness1Icon />
                  </ListItemIcon>
                  <ListItemText primary="Under construction" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </MenuStyled>
      </Drawer>
    </GroupBarStyled>
  );
}
