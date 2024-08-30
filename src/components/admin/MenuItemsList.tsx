import { List, Collapse } from "@mui/material";
import { useEffect, useState } from "react";
import { MenuItem } from "./MenuItem";
import { IMenuItem } from "./contexts/drawer-context";
import { usePathname, useRouter } from "next/navigation";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

const renderMenuItems = (items: IMenuItem[], pathname: string, level = 0) => {
  return items.map(({ literal, route, Icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = children && children.length > 0;
    const router = useRouter();

    const handleClick = () => {
      if (hasChildren) {
        setIsOpen(!isOpen);
        return;
      }
      router.push(route || "/");
    };

    // 子项如果被激活，父菜单需要展开
    // Check if any child route is active
    const isChildActive =
      hasChildren &&
      children.some((child) => pathname.startsWith(child.route || "/"));

    // If a child is active, ensure the parent menu is open
    useEffect(() => {
      if (isChildActive) {
        setIsOpen(true);
      }
    }, [isChildActive]);

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
