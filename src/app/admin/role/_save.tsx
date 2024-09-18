import { BaseDictSelect } from "@/components/BaseDictSelect";
import { BaseTreeSelect, TreeViewBaseItem } from "@/components/BaseTreeSelect";
import { useI18n } from "@/components/I18nProvider";
import { useToast } from "@/components/ToastProvider";
import { ADD_ID, DICT_KEYS, LABEL_TYPE } from "@/contants";
import api from "@/utils/request";
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { Menu } from "@prisma/client";
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
  (
    { id: _id, baseUrl, onClose, setEditLoading, onRefresh },
    ref
  ) => {
    const id = _id === ADD_ID ? "" : _id;
    const { t } = useI18n();

    const [menus, setMenus] = useState<any>([]);
    const [data, setData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});

    const { showSuccess, showError } = useToast();

    const getModelById = async () => {
      const res = await api.get(`${baseUrl}/${id}`);
      setData(res.data);
    };

    const getMenus = async () => {
      const { data: _data } = await api.get<Menu[]>(`/api/menu/tree`);
      const addLabel = (item: TreeViewBaseItem): TreeViewBaseItem => ({
        ...item,
        label: item.nameType === LABEL_TYPE.I18N ? t(item.name) : item.name,
        children: item.children.length > 0 ? item.children.map(addLabel) : [],
      });
      const newData = _data.map(addLabel as any);
      setMenus(newData);
    };

    const handleChange = (e: any) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = () => {
      let tempErrors: any = {};
      tempErrors.name = data.name ? "" : t("pages.admin.role.error.name.required");
      setErrors(tempErrors);
      return Object.values(tempErrors).every((x) => x === "");
    };

    const submit = async () => {
      if (validate()) {
        setEditLoading(true);
        if (!id) {
          try {
            const res = await api.post(`${baseUrl}`, data);
            showSuccess(res)
            onClose();
            onRefresh();
          } catch (error: any) {
            showError(error)
          } finally {
            setEditLoading(false);
          }
        } else {
          try {
            const res = await api.put(`${baseUrl}/${id}`, data);
            showSuccess(res)
            onClose();
            onRefresh();
          } catch (error: any) {
            showError(error)
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
        </Box>
      </Card>
    );
  }
);
SavePage.displayName = "SavePage";
