/* eslint-disable react/destructuring-assignment */
/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withRouter } from 'react-router';
import { History } from 'history';
import colors from '../styles/colors';
import useWindowDimensions from '../useDimensions';

interface MenuItemI {
  path: string;
  title: string;
}

interface Props {
  title: string;
  menuItems: MenuItemI[];
  history: History;
}

function SelectMenu(props: Props) {
  const { width } = useWindowDimensions();
  const [open, setOpen] = React.useState(false);
  const anchorEl = React.useRef(null);

  function handleToggle() {
    setOpen(!open);
  }

  const handleClose = (path: string) => (event: any) => {
    if (anchorEl.current!.contains(event.target)) {
      return;
    }
    props.history.push(path);
    setOpen(false);
  };
  return (
    <div
      style={{
        zIndex: 3,
        width: '100%'
      }}
    >
      <Button
        style={{
          width: '100%',
          backgroundColor: open ? colors.primary : colors.grey,
          borderRadius: 0
        }}
        buttonRef={anchorEl}
        aria-owns={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {props.title}
      </Button>
      <Popper open={open} anchorEl={anchorEl.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList style={{ minWidth: width * 0.2 }}>
                  {props.menuItems.map(item => (
                    <MenuItem key={item.path} onClick={handleClose(item.path)}>
                      {item.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default withRouter(SelectMenu);
