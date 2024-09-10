import { BaseDataSelect } from "@/components/BaseDataSelect";
import { BaseDictSelect } from "@/components/BaseDictSelect";
import { BaseTreeSelect } from "@/components/BaseTreeSelect";
import { useI18n } from "@/components/I18nProvider";
import { useToast } from "@/components/ToastProvider";
import { ADD_ID, DICT_KEYS } from "@/contants";
import api from "@/utils/request";
import {
    Box,
    Card,
    FormControl,
    TextField,
} from "@mui/material";
import { Menu } from "@prisma/client";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { ResponseType } from "@/utils/response";


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
            const addLabel = (item: Menu & { children?: Menu[] }): Menu & { label: string; children?: Menu[] } => ({
                ...item,
                label: item.name,
                children: item.children ? item.children.map(addLabel) : undefined
            });
            const newData = _data.map(addLabel);
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
            // setErrors(tempErrors);
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
                    <TextField
                        label={t("pages.admin.menu.icon")}
                        name="icon"
                        value={data.icon || ""}
                        onChange={handleChange}
                        error={!!errors.icon}
                        helperText={errors.icon}
                        fullWidth
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
                        {errors.type && <p style={{ color: "red" }}>{errors.type}</p>}
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
                        {errors.openStyle && <p style={{ color: "red" }}>{errors.openStyle}</p>}
                    </FormControl>
                    <TextField
                        label={t("pages.admin.menu.sort")}
                        name="sort"
                        type="number"
                        value={data.sort || ""}
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
