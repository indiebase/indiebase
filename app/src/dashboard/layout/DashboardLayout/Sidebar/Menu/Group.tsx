import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';
import { Item } from './Item';
import { Collapse } from './Collapse';

export const Group = ({ item }) => {
  const theme = useTheme();

  // menu list collapse & items
  const items = item.children?.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <Collapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <Item key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography
              variant="caption"
              sx={{ ...(theme.typography as any).menuCaption }}
              display="block"
              gutterBottom
            >
              {item.title}
              {item.caption && (
                <Typography
                  variant="caption"
                  sx={{ ...(theme.typography as any).subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};
