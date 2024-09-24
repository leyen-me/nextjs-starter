import { BaseDictSelect } from "@/components/BaseDictSelect";
import { BaseTreeSelect, TreeViewBaseItem } from "@/components/BaseTreeSelect";
import { useI18n } from "@/components/I18nProvider";
import { useToast } from "@/components/ToastProvider";
import {
  ADD_ID,
  DICT_KEYS,
} from "@/contants";
import api from "@/utils/request";
import { Box, Card, FormControl, TextField } from "@mui/material";
import { LabelType, SysMenu, SysMenuOpenStyle, SysMenuType } from "@prisma/client";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { BaseIconSelect } from "@/components/BaseIconSelect";

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

    const [data, setData] = useState<any>({
      pid: "",
      name: "",
      icon: "",
      url: "",
      type: SysMenuType.MENU,
      authority: "",
      openStyle: SysMenuOpenStyle.INTERNAL,
      nameType: LabelType.I18N,
      sort: 0,
    });
    const [errors, setErrors] = useState<any>({});
    const [menus, setMenus] = useState<any>([]);

    const { showSuccess, showError } = useToast();

    const getModelById = async () => {
      const res = await api.get(`${baseUrl}/${id}`);
      setData(res.data);
    };

    const handleChange = (e: any) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };

    const getMenus = async () => {
      const { data: _data } = await api.get<SysMenu[]>(`${baseUrl}/tree`);

      const newData1: TreeViewBaseItem[] = [
        {
          id: "0",
          pid: "0",
          name: t("pages.admin.menus.root"),
          label: t("pages.admin.menus.root"),
          nameType: LabelType.I18N,
          children: [],
        } as TreeViewBaseItem,
      ];

      const addLabel = (item: TreeViewBaseItem): TreeViewBaseItem => ({
        ...item,
        label: item.nameType === LabelType.I18N ? t(item.name) : item.name,
        children: item.children.length > 0 ? item.children.map(addLabel) : [],
      });
      const newData = _data.map(addLabel as any);
      newData1[0].children = newData as TreeViewBaseItem[];

      setMenus(newData1);
    };

    const validate = () => {
      let tempErrors: any = {};

      // 父级菜单
      if (!data.pid) {
        tempErrors.pid = t("pages.admin.menu.error.pid.required");
      }
      // 菜单名
      if (!data.name) {
        tempErrors.name = t("pages.admin.menu.error.name.required");
      }
      // 菜单名类型
      if (!data.nameType) {
        tempErrors.nameType = t("pages.admin.menu.error.nameType.required");
      }
      // 菜单路径
      if (!data.url) {
        tempErrors.url = t("pages.admin.menu.error.url.required");
      }
      // 菜单类型
      if (!data.type) {
        tempErrors.type = t("pages.admin.menu.error.type.required");
      }
      // 打开方式
      if (!data.openStyle) {
        tempErrors.openStyle = t("pages.admin.menu.error.openStyle.required");
      }

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <BaseTreeSelect
            label={t("pages.admin.menu.parent")}
            name="pid"
            items={menus}
            value={data.pid || ""}
            error={!!errors.pid}
            helperText={errors.pid}
            disableSelections={[data.id || ""]}
            onChange={handleChange}
          />
          <TextField
            label={t("pages.admin.menu.name")}
            name="name"
            value={data.name || ""}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <BaseDictSelect
            label={t("pages.admin.menu.nameType")}
            name="nameType"
            size="medium"
            allowAll={false}
            value={data.nameType || ""}
            onChange={handleChange}
            dictKey={DICT_KEYS.LabelType}
            error={!!errors.nameType}
            helperText={errors.nameType}
          />
          {data.type === SysMenuType.MENU && (
            <>
              <BaseIconSelect
                label={t("pages.admin.menu.icon")}
                name="icon"
                value={data.icon || ""}
                onChange={handleChange}
                error={!!errors.icon}
                helperText={errors.icon}
              />
              <TextField
                label={t("pages.admin.menu.url")}
                name="url"
                value={data.url || ""}
                onChange={handleChange}
                error={!!errors.url}
                helperText={errors.url}
                fullWidth
              />
            </>
          )}
          <BaseDictSelect
            label={t("pages.admin.menu.type")}
            name="type"
            size="medium"
            allowAll={false}
            value={data.type || ""}
            onChange={handleChange}
            dictKey={DICT_KEYS.SysMenuType}
            error={!!errors.type}
            helperText={errors.type}
          />
          {data.type === SysMenuType.INTERFACE && (
            <TextField
              label={t("pages.admin.menu.authority")}
              name="authority"
              value={data.authority || ""}
              onChange={handleChange}
              error={!!errors.authority}
              helperText={errors.authority}
              fullWidth
            />
          )}
          {data.type === SysMenuType.MENU && (
            <BaseDictSelect
              label={t("pages.admin.menu.openStyle")}
              name="openStyle"
              size="medium"
              allowAll={false}
              value={data.openStyle || ""}
              error={!!errors.openStyle}
              helperText={errors.openStyle}
              onChange={handleChange}
              dictKey={DICT_KEYS.SysMenuOpenStyle}
            />
          )}
          <TextField
            label={t("pages.admin.menu.sort")}
            name="sort"
            type="number"
            value={data.sort || 0}
            onChange={handleChange}
            error={!!errors.sort}
            helperText={errors.sort}
            fullWidth
          />
        </Box>
      </Card>
    );
  }
);
SavePage.displayName = "SavePage";
