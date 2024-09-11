// import { TreeViewBaseItem } from "@mui/x-tree-view/models";
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
import { RichTreeViewPro } from "@mui/x-tree-view-pro";
import { useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { treeToMap } from "../utils/tree";
import { TREE_ROOT_ID } from "@/contants";

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

  multiple?: boolean;
  onChange?: (e: SelectChangeEvent<string>) => void;
};

export function BaseTreeSelect({
  label,
  name,
  value,
  items,
  multiple = false,
  onChange,
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

  const defaultExpandedItems = useMemo(() => {
    const getParentIds = (id: string, acc: string[] = []): string[] => {
      const parent = treeMap.get(id)?.pid;
      if (parent && parent !== TREE_ROOT_ID) {
        return getParentIds(parent, [...acc, parent]);
      }
      return acc;
    };
    return Array.isArray(value)
      ? value.flatMap((id) => getParentIds(id))
      : value !== TREE_ROOT_ID
      ? getParentIds(value)
      : [];
  }, [value, items]);

  useEffect(() => {
    setSelectedItems(Array.isArray(value) ? value : [value]);
    setFormatValue(
      Array.isArray(value)
        ? value.map((id) => treeMap.get(id)?.label).join(",")
        : treeMap.get(value)?.label
    );
  }, [value, items]);

  const handleSelectedItemsChange = (
    event: React.SyntheticEvent,
    itemIds: string | string[] | null
  ) => {
    if (!multiple) {
      setSelectedItems([itemIds as string]);
      return;
    }
    setSelectedItems(itemIds as string[]);
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
    <FormControl variant="outlined" size={"medium"} sx={{ minWidth: 120 }}>
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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent>
          <RichTreeViewPro
            selectedItems={selectedItems}
            defaultExpandedItems={defaultExpandedItems}
            multiSelect={multiple}
            checkboxSelection={multiple}
            items={items}
            onSelectedItemsChange={handleSelectedItemsChange}
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
