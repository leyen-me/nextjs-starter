import { List, Collapse } from "@mui/material";
import { useEffect, useState } from "react";
import { MenuItem } from "./MenuItem";
import { usePathname, useRouter } from "next/navigation";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Menu } from "@prisma/client";
import { LABEL_TYPE, MENU_OPEN_STYLE } from "@/contants";
import { isExternalUrl } from "@/utils/stringUtil";
import { useMenuStore } from "@/stores/menuStore";
import { useI18n } from "../I18nProvider";

const renderMenuItems = (items: Menu[], pathname: string, level = 0) => {
  return items.map(
    ({
      name,
      nameType,
      url,
      type,
      openStyle,
      icon,
      sort,
      createdAt,
      // @ts-ignore
      children,
    }) => {
      const [isOpen, setIsOpen] = useState(false);
      const { t } = useI18n();
      const { setHeader } = useMenuStore();

      const hasChildren = children && children.length > 0;
      const router = useRouter();

      const handleClick = () => {
        if (hasChildren) {
          setIsOpen(!isOpen);
          return;
        }
        if (openStyle === MENU_OPEN_STYLE.INTERNAL) {
          if (isExternalUrl(url)) {
            router.push(`/admin/iframe/${encodeURIComponent(url)}`);
          } else {
            router.push(url || "/");
          }
        } else {
          window.open(url, "_blank");
        }
      };

      // 子项如果被激活，父菜单需要展开
      // Check if any child route is active
      const isChildActive =
        hasChildren &&
        children.some((child: Menu) => pathname.startsWith(child.url || "/"));

      // If a child is active, ensure the parent menu is open
      useEffect(() => {
        if (isChildActive) {
          setIsOpen(true);
        }
      }, [isChildActive]);

      useEffect(() => {
        if (pathname === url) {
          setHeader(nameType === LABEL_TYPE.I18N ? t(name) : name);
        }
      }, [pathname, url, name, nameType]);

      return (
        <div key={url}>
          <MenuItem
            icon={icon || ""}
            name={name}
            nameType={nameType}
            url={url}
            selected={pathname === url}
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
    }
  );
};

export const MenuItemsList = ({ items = [] }: { items?: Menu[] }) => {
  const pathname = usePathname();
  if (!items.length) return null;

  return <List sx={{ p: 0 }}>{renderMenuItems(items, pathname)}</List>;
};
