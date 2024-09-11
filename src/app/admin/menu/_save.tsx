import { BaseDataSelect } from "@/components/BaseDataSelect";
import { BaseDictSelect } from "@/components/BaseDictSelect";
import { BaseTreeSelect, TreeViewBaseItem } from "@/components/BaseTreeSelect";
import { useI18n } from "@/components/I18nProvider";
import { useToast } from "@/components/ToastProvider";
import { ADD_ID, DICT_KEYS } from "@/contants";
import api from "@/utils/request";
import { Box, Card, FormControl, TextField } from "@mui/material";
import { Menu } from "@prisma/client";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { ResponseType } from "@/utils/response";
import { BaseFormError } from "@/components/BaseFormError";
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
      type: "",
      openStyle: "",
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
      const { data: _data } = await api.get<Menu[]>(`${baseUrl}/tree`);

      const addLabel = (item: TreeViewBaseItem): TreeViewBaseItem => ({
        ...item,
        label: item.name,
        children: item.children.length > 0 ? item.children.map(addLabel) : [],
      });
      const newData = _data.map(addLabel as any);

      newData.unshift({
        id: "0",
        pid: "0",
        name: "顶级菜单",
        label: "顶级菜单",
        children: [],
      } as TreeViewBaseItem);

      setMenus(newData);
    };

    const validate = () => {
      let tempErrors: any = {};
      // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // tempErrors.email = data.email
      //     ? emailRegex.test(data.email)
      //         ? ""
      //         : t("pages.admin.user.error.email.format")
      //     : t("pages.admin.user.error.email.required");

      // if (!id) {
      //     tempErrors.password = data.password
      //         ? ""
      //         : t("pages.admin.user.error.password.required");
      // }
      // tempErrors.nickname = data.nickname
      //     ? ""
      //     : t("pages.admin.user.error.nickname.required");
      // tempErrors.gender = data.gender
      //     ? ""
      //     : t("pages.admin.user.error.gender.required");
      // tempErrors.mobile = data.mobile
      //     ? ""
      //     : t("pages.admin.user.error.mobile.required");
      // tempErrors.status = data.status
      //     ? ""
      //     : t("pages.admin.user.error.status.required");

      // 父级菜单
      if (!data.pid) {
        tempErrors.pid = t("pages.admin.menu.error.pid.required");
      }
      // 菜单名
      if (!data.name) {
        tempErrors.name = t("pages.admin.menu.error.name.required");
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
          <FormControl fullWidth error={!!errors.type}>
            <BaseTreeSelect
              label={t("pages.admin.menu.parent")}
              name="pid"
              items={menus}
              value={data.pid || ""}
              onChange={handleChange}
            />
            <BaseFormError error={errors.pid} />
          </FormControl>
          <TextField
            label={t("pages.admin.menu.name")}
            name="name"
            value={data.name || ""}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <BaseIconSelect
            label={t("pages.admin.menu.icon")}
            name="icon"
            value={data.icon || ""}
            onChange={handleChange}
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
          <FormControl fullWidth error={!!errors.type}>
            <BaseDictSelect
              label={t("pages.admin.menu.type")}
              name="type"
              size="medium"
              allowAll={false}
              value={data.type || ""}
              onChange={handleChange}
              dictKey={DICT_KEYS.MenuType}
            />
            <BaseFormError error={errors.type} />
          </FormControl>
          <FormControl fullWidth error={!!errors.openStyle}>
            <BaseDictSelect
              label={t("pages.admin.menu.openStyle")}
              name="openStyle"
              size="medium"
              allowAll={false}
              value={data.openStyle || ""}
              onChange={handleChange}
              dictKey={DICT_KEYS.MenuOpenStyle}
            />
            <BaseFormError error={errors.openStyle} />
          </FormControl>
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