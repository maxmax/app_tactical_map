import React, { useState, useEffect } from "react";
import { observer, inject } from 'mobx-react';
import { useNavigate, useParams } from 'react-router-dom';

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


interface NavigationComponentProps extends BoxProps {
  // children?: React.ReactNode;
  menu: [];
  state?: string;
}

const NavigationStyled = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 2,
  padding: theme.spacing(2),
}));

const MenuStyled = styled(Box)<BoxProps>(({ theme }) => ({
  width: 250
}));

type MenuProps = {
  id: number;
  name: string;
}

export function NavigationComponent({
  menu, state, ...other
}: NavigationComponentProps) {
  const [drawerState, setDrawerState] = React.useState(false);
  const [openPlanetList, setOpenPlanetList] = React.useState(false);

  const toggleDrawer = () => setDrawerState(!drawerState);

  const togglePlanetList = () => setOpenPlanetList(!openPlanetList);

  // console.log('_____________D__________menuStore_KKKKKKKKK', menu);
  // console.log('_____________D____state______menuStore_KKKKKKKKK', state);

  return (
    <NavigationStyled {...other}>
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
              <ListItemText primary="Systems" />
              {openPlanetList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openPlanetList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/*menu && menu.length && menu.map((col: MenuProps) => {
                  return (
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <Brightness1Icon />
                      </ListItemIcon>
                      <ListItemText primary="Moon" />
                    </ListItemButton>
                  )
                })*/}
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Brightness1Icon />
                  </ListItemIcon>
                  <ListItemText primary="Moon" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Brightness1Icon />
                  </ListItemIcon>
                  <ListItemText primary="Mars" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </MenuStyled>
      </Drawer>
    </NavigationStyled>
  );
}

type StoreSceneProps = {
  // sceneObjects?: SceneObjectProps[];
  // mainObject?: SceneMainProps;
  getScenes?: Function;
  getScene?: Function;
  getInfoDialog?: Function;
  pending: boolean;
  scenes?: [];
}

type StoreProps = {
  // menuStore?: MenuStoreProps;
  sceneStore?: StoreSceneProps;
}

const Navigation = inject('sceneStore')(observer((props: StoreProps) => {

  // 👇️ get ID from url
  const params = useParams();

  const {
    sceneStore,
    // menuStore,
    // : {
    //  sceneObjects
    // },
    // rootStore
  } = props;

  useEffect(() => {
    sceneStore?.getScenes && sceneStore.getScenes();
    // menuStore?.getMenu && menuStore.getMenu();
    // sceneStore?.getScenes && sceneStore.getScenes();
  }, []);

  console.log('Navigation__________sceneStore__________', sceneStore?.scenes);

  return (
    <>
      <NavigationComponent menu={[]} />
    </>
  );
}));

export default Navigation;
