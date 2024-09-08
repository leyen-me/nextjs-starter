import { BaseDataSelect } from "@/components/BaseDataSelect";
import { BaseDictSelect } from "@/components/BaseDictSelect";
import { useI18n } from "@/components/I18nProvider";
import { useToast } from "@/components/ToastProvider";
import { ADD_ID, DICT_KEYS } from "@/contants";
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
import { Role } from "@prisma/client";
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

    const [data, setData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [roles, setRoles] = useState<Role[]>([]);

    const { showSuccess, showError } = useToast();

    const getModelById = async () => {
      const res = await api.get(`${baseUrl}/${id}`);
      setData(res.data);
    };

    const getRoles = async () => {
      const res = await api.get<Role[]>("/api/role/list");
      setRoles(res.data);
    };

    const handleChange = (e: any) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };

    const validate = () => {
      let tempErrors: any = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      tempErrors.email = data.email
        ? emailRegex.test(data.email)
          ? ""
          : t("pages.admin.user.error.email.format")
        : t("pages.admin.user.error.email.required");

      if (!id) {
        tempErrors.password = data.password
          ? ""
          : t("pages.admin.user.error.password.required");
      }
      tempErrors.nickname = data.nickname
        ? ""
        : t("pages.admin.user.error.nickname.required");
      tempErrors.gender = data.gender
        ? ""
        : t("pages.admin.user.error.gender.required");
      tempErrors.mobile = data.mobile
        ? ""
        : t("pages.admin.user.error.mobile.required");
      tempErrors.status = data.status
        ? ""
        : t("pages.admin.user.error.status.required");
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
      if (id) {
        getModelById();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
      getRoles();
    }, []);

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
            label={t("pages.admin.user.email")}
            name="email"
            value={data.email || ""}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
          {!id && (
            <TextField
              label={t("pages.admin.user.password")}
              name="password"
              type="password"
              value={data.password || ""}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
            />
          )}
          <TextField
            label={t("pages.admin.user.nickname")}
            name="nickname"
            value={data.nickname || ""}
            onChange={handleChange}
            error={!!errors.nickname}
            helperText={errors.nickname}
            fullWidth
          />
          <FormControl fullWidth error={!!errors.gender}>
            <BaseDictSelect
              label={t("pages.admin.user.gender")}
              name="gender"
              size="medium"
              allowAll={false}
              value={data.gender || ""}
              onChange={handleChange}
              dictKey={DICT_KEYS.Gender}
            />
            {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
          </FormControl>
          <TextField
            label={t("pages.admin.user.mobile")}
            name="mobile"
            value={data.mobile || ""}
            onChange={handleChange}
            error={!!errors.mobile}
            helperText={errors.mobile}
            fullWidth
          />
          <FormControl fullWidth error={!!errors.status}>
            <BaseDictSelect
              label={t("pages.admin.user.status")}
              name="status"
              size="medium"
              allowAll={false}
              value={data.status || ""}
              onChange={handleChange}
              dictKey={DICT_KEYS.UserStatus}
            />
            {errors.status && <p style={{ color: "red" }}>{errors.status}</p>}
          </FormControl>
          <FormControl fullWidth error={!!errors.status}>
            <BaseDataSelect
              label={t("pages.admin.user.roles")}
              name="roleIdList"
              value={data.roleIdList}
              data={roles}
              onChange={handleChange}
            />
            {errors.roleIdList && (
              <p style={{ color: "red" }}>{errors.roleIdList}</p>
            )}
          </FormControl>
        </Box>
      </Card>
    );
  }
);
SavePage.displayName = "SavePage";
