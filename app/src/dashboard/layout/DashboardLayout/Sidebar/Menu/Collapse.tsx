import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Collapse as MuiCollapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Item } from './Item';
import { IconChevronDown, IconChevronUp, IconWifi0 } from '@tabler/icons';

export const Collapse = ({ menu, level }) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
  };

  // menu collapse & item
  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <Collapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return <Item key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon
      strokeWidth={1.5}
      size="1.3rem"
      style={{ marginTop: 'auto', marginBottom: 'auto' }}
    />
  ) : (
    <IconWifi0 />
    // <FiberManualRecordIcon
    //   sx={{
    //     width: selected === menu.id ? 8 : 6,
    //     height: selected === menu.id ? 8 : 6,
    //   }}
    //   fontSize={level > 0 ? 'inherit' : 'medium'}
    // />
  );

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: '12px',
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`,
        }}
        selected={selected === menu.id}
        onClick={handleClick}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>
          {menuIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant={selected === menu.id ? 'h5' : 'body1'}
              color="inherit"
              sx={{ my: 'auto' }}
            >
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography
                variant="caption"
                sx={{ ...(theme.typography as any).subMenuCaption }}
                display="block"
                gutterBottom
              >
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <IconChevronUp
            stroke={1.5}
            size="1rem"
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        ) : (
          <IconChevronDown
            stroke={1.5}
            size="1rem"
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        )}
      </ListItemButton>
      <MuiCollapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 1,
              background: theme.palette.primary.light,
            },
          }}
        >
          {menus}
        </List>
      </MuiCollapse>
    </>
  );
};
