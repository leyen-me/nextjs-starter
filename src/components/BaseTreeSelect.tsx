import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  InputAdornment,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { RichTreeViewPro, useTreeViewApiRef } from "@mui/x-tree-view-pro";
import { useEffect, useMemo, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { treeToMap } from "../utils/tree";
import { TREE_ROOT_ID } from "@/contants";
import { BaseFormError } from "./BaseFormError";
import { isFunction } from "@/utils/funcUtils";

export type TreeViewBaseItem = {
  id: string;
  label: string;
  children: TreeViewBaseItem[];
  [key: string]: any;
};

type BaseTreeSelectProps = {
  label: string;
  name: string;
  value: string | string[];
  items: TreeViewBaseItem[];

  disableSelections?: string[];
  error?: boolean;
  helperText?: string;
  multiple?: boolean;
  onChange?: (e: SelectChangeEvent<string>) => void;
  onSelectedItemsChange?: (
    event: React.SyntheticEvent,
    itemIds: string | string[] | null,
    treeMap: Map<string, TreeViewBaseItem>
  ) => boolean;
  onItemSelectionToggle?: (
    event: React.SyntheticEvent,
    itemId: string,
    isSelected: boolean,
    treeMap: Map<string, TreeViewBaseItem>
  ) => boolean;
};

function getItemDescendantsIds(item: TreeViewBaseItem) {
  const ids: string[] = [];
  item.children?.forEach((child) => {
    ids.push(child.id);
    ids.push(...getItemDescendantsIds(child));
  });

  return ids;
}

const getParentIds = (
  id: string,
  treeMap: Map<string, TreeViewBaseItem>,
  acc: string[] = []
): string[] => {
  const parent = treeMap.get(id)?.pid;
  if (parent && parent !== TREE_ROOT_ID) {
    return getParentIds(parent, treeMap, [...acc, parent]);
  }
  return acc;
};

export function BaseTreeSelect({
  label,
  name,
  value,
  items,

  disableSelections = [],
  error = false,
  helperText = "",
  multiple = false,
  onChange,
  onSelectedItemsChange,
  onItemSelectionToggle,
}: BaseTreeSelectProps) {
  const [open, setOpen] = useState(false);
  const treeMap = useMemo(() => treeToMap(items), [items]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formatValue, setFormatValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [defaultExpandedItems, setDefaultExpandedItems] = useState<string[]>(
    []
  );
  const toggledItemRef = useRef<{ [itemId: string]: boolean }>({});
  const apiRef = useTreeViewApiRef();

  const isItemDisabled = (item: TreeViewBaseItem) => {
    return disableSelections.includes(item.id);
  };

  useEffect(() => {
    // 默认选择
    setSelectedItems(Array.isArray(value) ? value : [value]);
    // 默认展开
    setDefaultExpandedItems(
      Array.isArray(value)
        ? value.flatMap((id) => getParentIds(id, treeMap))
        : value !== TREE_ROOT_ID
        ? getParentIds(value, treeMap)
        : []
    );
    // 格式化值
    setFormatValue(
      Array.isArray(value)
        ? value.map((id) => treeMap.get(id)?.label).join(",")
        : treeMap.get(value)?.label || ""
    );
  }, [value, items, treeMap]);

  const handleSelectedItemsChange = (
    event: React.SyntheticEvent,
    itemIds: string | string[] | null
  ) => {
    if (onSelectedItemsChange && isFunction(onSelectedItemsChange)) {
      const res = onSelectedItemsChange(event, itemIds, treeMap);
      // 返回false, 表示不能选择
      if (!res) {
        return;
      }
    }

    if (!multiple) {
      setSelectedItems([itemIds as string]);
      return;
    }
    setSelectedItems(itemIds as string[]);

    // Select / unselect the children of the toggled item
    const itemsToSelect: string[] = [];
    const itemsToUnSelect: { [itemId: string]: boolean } = {};
    Object.entries(toggledItemRef.current).forEach(([itemId, isSelected]) => {
      const item = apiRef.current!.getItem(itemId);
      if (isSelected) {
        itemsToSelect.push(...getItemDescendantsIds(item));
      } else {
        getItemDescendantsIds(item).forEach((descendantId) => {
          itemsToUnSelect[descendantId] = true;
        });
      }
    });

    const newSelectedItemsWithChildren = Array.from(
      new Set(
        [...(itemIds as string[]), ...itemsToSelect].filter(
          (itemId) => !itemsToUnSelect[itemId]
        )
      )
    );

    setSelectedItems(newSelectedItemsWithChildren);
    toggledItemRef.current = {};
  };

  const handleItemSelectionToggle = (
    event: React.SyntheticEvent,
    itemId: string,
    isSelected: boolean
  ) => {
    if (onItemSelectionToggle && isFunction(onItemSelectionToggle)) {
      const res = onItemSelectionToggle(event, itemId, isSelected, treeMap);
      if (!res) {
        return;
      }
    }
    toggledItemRef.current[itemId] = isSelected;
  };

  const handleSubmit = () => {
    if (!multiple) {
      onChange &&
        onChange({
          target: { name, value: selectedItems[0] },
        } as SelectChangeEvent);
    } else {
      onChange &&
        onChange({
          target: { name, value: selectedItems },
        } as unknown as SelectChangeEvent);
    }
    handleClose();
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      size={"medium"}
      sx={{ minWidth: 120 }}
      error={error}
    >
      <TextField
        label={label}
        defaultValue={formatValue}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleOpen}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <BaseFormError error={helperText} />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <RichTreeViewPro
            apiRef={apiRef}
            isItemDisabled={isItemDisabled}
            selectedItems={selectedItems}
            defaultExpandedItems={defaultExpandedItems}
            multiSelect={multiple}
            checkboxSelection={multiple}
            items={items}
            onSelectedItemsChange={handleSelectedItemsChange}
            onItemSelectionToggle={handleItemSelectionToggle}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button type="submit" onClick={handleSubmit}>
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
}
