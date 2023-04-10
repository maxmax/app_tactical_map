import React from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import { Link } from "react-router-dom";
// import IconButton from '@mui/material/IconButton';
// import SettingsIcon from '@mui/icons-material/Settings';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import Collapse from '@mui/material/Collapse';
// import Brightness1Icon from '@mui/icons-material/Brightness1';


interface MapsNavigationProps extends BoxProps {
  // children?: React.ReactNode;
}

const MapsNavigationStyled = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: 2,
  left: 50,
  zIndex: 2,
  padding: theme.spacing(2),
  color: 'white'
}));

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  // position: 'absolute',
  // top: 2,
  // left: 50,
  // zIndex: 2,
  padding: theme.spacing(2),
  // color: 'white'
}));

// const MenuStyled = styled(Box)<BoxProps>(({ theme }) => ({
//  width: 250
// }));

export function MapsNavigation({
  ...other
}: MapsNavigationProps) {
  // const [drawerState, setDrawerState] = React.useState(false);
  // const [openPlanetList, setOpenPlanetList] = React.useState(false);
  // const toggleDrawer = () => setDrawerState(!drawerState);
  // const togglePlanetList = () => setOpenPlanetList(!openPlanetList);
  // <a href='/systems/0/terrains/0'>Map 1</a>

  return (
    <MapsNavigationStyled {...other}>
      <div>
        {/*<Button
           // target="_blank"
           component="a"
           href="/systems/0/terrains/0"
        >
         Map 1
        </Button>
        <Button variant="contained" href="/systems/0/terrains/1">
          Link 1
        </Button>*/}
        <Button variant="contained" component={Link} to="/systems/0/terrains/0">
          Map 1
        </Button>
        <Button variant="contained" component={Link} to="/systems/0/terrains/1">
          Map 2
        </Button>
        <Button variant="contained" component={Link} to="/systems/0/terrains/2">
          Map 3
        </Button>
        <Button variant="contained" component={Link} to="/systems/0/terrains/3">
          Map 4
        </Button>
      </div>
    </MapsNavigationStyled>
  );
}
