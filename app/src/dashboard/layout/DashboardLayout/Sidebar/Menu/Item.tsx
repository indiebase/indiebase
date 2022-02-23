import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { IconWifi0 } from '@tabler/icons';

// project imports
// import { MENU_OPEN, SET_MENU } from 'store/actions';

export const Item = ({ item, level }) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <IconWifi0 />
    // <FiberManualRecordIcon
    //   sx={{
    //     width:
    //       customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
    //     height:
    //       customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
    //   }}
    //   fontSize={level > 0 ? 'inherit' : 'medium'}
    // />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps: any = {
    component: forwardRef((props, ref) => (
      <Link
        ref={ref as any}
        {...props}
        to={`${item.url}`}
        target={itemTarget}
      />
    )),
  };
  if (item?.uri) {
    listItemProps = {
      component: 'a',
      href: item.url,
      target: itemTarget,
    };
  }

  const itemHandler = (id) => {
    // dispatch({ type: MENU_OPEN, id });
    // if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      // dispatch({ type: MENU_OPEN, id: item.id });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `12px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      selected={
        /* customization.isOpen.findIndex((id) => id === item.id) > -1 */ false
      }
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant={
              true
                ? // customization.isOpen.findIndex((id) => id === item.id) > -1
                  'h5'
                : 'body1'
            }
            color="inherit"
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant="caption"
              sx={{ ...(theme.typography as any).subMenuCaption }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};
