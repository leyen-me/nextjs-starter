import { List, Collapse } from "@mui/material";
import { useState } from "react";
import { MenuItem } from "./MenuItem";
import { IMenuItem } from "./contexts/drawer-context";
import { usePathname } from "next/navigation";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

const renderMenuItems = (items: IMenuItem[], pathname: string, level = 0) => {
  return items.map(({ literal, route, Icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = children && children.length > 0;

    const handleClick = () => {
      if (hasChildren) {
        setIsOpen(!isOpen);
      }
    };

    return (
      <div key={route}>
        <MenuItem
          Icon={Icon}
          literal={literal}
          route={route}
          selected={pathname === route}
          onClick={handleClick}
          endIcon={hasChildren ? <ExpandMoreIcon /> : undefined}
          level={level}
        />
        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderMenuItems(children, pathname, level + 1)}
            </List>
          </Collapse>
        )}
      </div>
    );
  });
};

export const MenuItemsList = ({ items = [] }: { items?: IMenuItem[] }) => {
  const pathname = usePathname();
  if (!items.length) return null;

  return <List sx={{ p: 0 }}>{renderMenuItems(items, pathname)}</List>;
};
