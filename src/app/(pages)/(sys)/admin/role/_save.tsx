import { BaseDictSelect } from "@/components/BaseDictSelect";
import { BaseTreeSelect, TreeViewBaseItem } from "@/components/BaseTreeSelect";
import { useI18n } from "@/components/I18nProvider";
import { useToast } from "@/components/ToastProvider";
import { ADD_ID } from "@/contants";
import { I18nError } from "@/utils/error";
import api from "@/utils/request";
import {
  Box,
  Card,
  Select,
  TextField,
} from "@mui/material";
import { LabelType, SysMenu, SysMenuType } from "@prisma/client";
import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

export type SavePageRef = {
  submit: () => void;
};

type SavePageProps = {
  id: string;
  baseUrl: string;
  onClose: () => void;
  editLoading: boolean;
  setEditLoading: (loading: boolean) => void;
  onRefresh: () => void;
};

export const SavePage = forwardRef<SavePageRef, SavePageProps>(
  ({ id: _id, baseUrl, onClose, setEditLoading, onRefresh }, ref) => {
    const id = _id === ADD_ID ? "" : _id;
    const { t } = useI18n();

    const [menus, setMenus] = useState<any>([]);
    const [authorityMenus, setAuthorityMenus] = useState<any>([]);
    const [data, setData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});

    const { showSuccess, showError } = useToast();

    const getModelById = async () => {
      const res = await api.get(`${baseUrl}/${id}`);
      setData(res.data);
    };

    const getMenus = async () => {
      const { data: menuData } = await api.get<SysMenu[]>(`/api/menu/tree`);
      const { data: authorityMenuData } = await api.get<SysMenu[]>(
        `/api/menu/authority`
      );
      const addLabel = (item: TreeViewBaseItem): TreeViewBaseItem => ({
        ...item,
        label: item.nameType === LabelType.I18N ? t(item.name) : item.name,
        children: item.children.length > 0 ? item.children.map(addLabel) : [],
      });
      const newMenuData = menuData.map(addLabel as any);
      setMenus(newMenuData);

      const newAuthorityMenuData = authorityMenuData.map(addLabel as any);
      setAuthorityMenus(newAuthorityMenuData);
    };

    const handleChange = (e: any) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleAuthoritySelectedItemsChange = (
      event: React.SyntheticEvent,
      itemIds: string | string[] | null,
      treeMap: Map<string, TreeViewBaseItem>
    ) => {
      let hasMenu = false;
      for (let id of itemIds as string[]) {
        if (treeMap.get(id)?.type === SysMenuType.MENU) {
          hasMenu = true;
          break;
        }
      }
      if (hasMenu) {
        showError(new I18nError("pages.admin.role.warning.authorityMenu"));
      }
      return !hasMenu;
    };

    const handleAuthorityItemSelectionToggle = (
      event: React.SyntheticEvent,
      itemId: string,
      isSelected: boolean,
      treeMap: Map<string, TreeViewBaseItem>
    ) => {
      return handleAuthoritySelectedItemsChange(event, [itemId], treeMap);
    };

    const validate = () => {
      let tempErrors: any = {};
      tempErrors.name = data.name
        ? ""
        : t("pages.admin.role.error.name.required");
      setErrors(tempErrors);
      return Object.values(tempErrors).every((x) => x === "");
    };

    const submit = async () => {
      if (validate()) {
        setEditLoading(true);
        if (!id) {
          try {
            const res = await api.post(`${baseUrl}`, data);
            showSuccess(res);
            onClose();
            onRefresh();
          } catch (error: any) {
            showError(error);
          } finally {
            setEditLoading(false);
          }
        } else {
          try {
            const res = await api.put(`${baseUrl}/${id}`, data);
            showSuccess(res);
            onClose();
            onRefresh();
          } catch (error: any) {
            showError(error);
          } finally {
            setEditLoading(false);
          }
        }
      }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      submit();
    };

    useImperativeHandle(ref, () => ({
      submit,
    }));

    useEffect(() => {
      getMenus();
    }, []);

    useEffect(() => {
      if (id) {
        getModelById();
      }
    }, [id]);

    return (
      <Card
        sx={{
          p: 2,
          width: "100%",
          maxWidth: 600,
          margin: "0 auto",
          marginTop: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label={t("pages.admin.role.name")}
            name="name"
            value={data.name || ""}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <BaseTreeSelect
            label={t("pages.admin.role.menuIdList")}
            name="menuIdList"
            value={data.menuIdList || []}
            onChange={handleChange}
            items={menus}
            multiple
          />

          {/* 不能选择菜单，但是能选择权限，又要完全展示菜单 */}
          <BaseTreeSelect
            label={t("pages.admin.role.authorityMenuIdList")}
            name="authorityMenuIdList"
            value={data.authorityMenuIdList || []}
            items={authorityMenus}
            multiple
            onChange={handleChange}
            onSelectedItemsChange={handleAuthoritySelectedItemsChange}
            onItemSelectionToggle={handleAuthorityItemSelectionToggle}
          />
        </Box>
      </Card>
    );
  }
);
SavePage.displayName = "SavePage";
