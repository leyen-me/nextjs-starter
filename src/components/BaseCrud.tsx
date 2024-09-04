"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useI18n } from "@/components/I18nProvider";
import { Gender, UserStatus } from "@prisma/client";
import api from "@/utils/request";
import type { Page } from "@/types";
import { DEFAULT_PAGE_SIZE, DICT_KEYS, PAGE_SIZE_OPTIONS } from "@/contants";
import { BaseTablePagination } from "@/components/BaseTablePagination";
import { BaseCard } from "@/components/BaseCard";
import { FiltersOption, useFilter } from "@/hooks/useFilter";
import type {
    UserPageFilters,
    UserWithoutPassword,
} from "@/app/api/user/page/route";
import { BaseDictSelect } from "@/components/BaseDictSelect";
import { CachedOutlined, SearchOutlined } from "@mui/icons-material";
import { BaseDictTag } from "@/components/BaseDictTag";
import { BaseTableDeleteDialog } from "@/components/BaseTableDeleteDialog";
import { useToast } from "@/components/ToastProvider";


export type BaseCrudProps = {
    baseUrl: string;
    filtersOptions: FiltersOption[];
};

export function BaseCrud({ baseUrl, filtersOptions }: BaseCrudProps) {

    // 国际化
    const { t } = useI18n();
    // 提示
    const { showToast } = useToast();

    // 分页
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    // 删除
    const [deleteId, setDeleteId] = useState<string>("");
    const [deleteLoading, setDeleteLoading] = useState(false);

    // 数据
    const [users, setUsers] = useState<UserWithoutPassword[]>([]);

    // 过滤
    const { filters, handleFilterChange, handleReset, getFilterWithRequest } = useFilter(filtersOptions);

    // 获取数据
    const fetchModels = async () => {
        const { data } = await api.get<Page<UserWithoutPassword>>(
            `${baseUrl}/page`,
            {
                params: {
                    page: page.toString(),
                    pageSize: pageSize.toString(),
                    ...getFilterWithRequest(),
                },
            }
        );
        const { total: _total, data: _users } = data;
        setUsers(_users);
        setTotal(_total);
    };

    const handleSearch = () => {
        fetchModels();
    };

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (pageSize: number) => {
        setPageSize(pageSize);
    };

    const handleEdit = (id: string) => {
        console.log(id);
    };

    const handleDelete = (id: string) => {
        setDeleteId(id);
    };

    const handleDeleteCancel = () => {
        setDeleteId("");
    };

    const handleDeleteConfirm = async () => {
        try {
            setDeleteLoading(true);
            await api.delete(`${baseUrl}/${deleteId}`);
            showToast(t("pages.common.deleteSuccess"), "success");
        } catch (error) {
            showToast(t("pages.common.deleteFailed"), "error");
        } finally {
            handleDeleteCancel();
            setDeleteLoading(false);
        }
    };

    useEffect(() => {
        fetchModels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize]);

    useEffect(() => {
        fetchModels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <BaseCard title={t("pages.common.filter")}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        {
                            filters.map((option) => {
                                if (option.type === "text") {
                                    return <TextField
                                        key={option.name}
                                        label={option.label}
                                        variant="outlined"
                                        name={option.name}
                                        value={option.value}
                                        onChange={handleFilterChange}
                                        size="small"
                                    />
                                } else if (option.type === "dict") {
                                    return <BaseDictSelect
                                        key={option.name}
                                        dictKey={option.dictKey || ""}
                                        label={option.label}
                                        name={option.name}
                                        value={option.value as string}
                                        onChange={handleFilterChange}
                                    ></BaseDictSelect>
                                }
                            })
                        }
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={handleReset}
                                startIcon={<CachedOutlined />}
                            >
                                {t("pages.common.reset")}
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSearch}
                                startIcon={<SearchOutlined />}
                            >
                                {t("pages.common.search")}
                            </Button>
                        </Box>
                    </Box>
                </BaseCard>
                <BaseCard title={t("pages.common.results")}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ minWidth: 80 }}>序号</TableCell>
                                    <TableCell sx={{ minWidth: 150 }}>
                                        {t("pages.admin.user.email")}
                                    </TableCell>
                                    <TableCell sx={{ minWidth: 150 }}>
                                        {t("pages.admin.user.nickname")}
                                    </TableCell>
                                    <TableCell sx={{ minWidth: 150 }}>
                                        {t("pages.admin.user.gender")}
                                    </TableCell>
                                    <TableCell sx={{ minWidth: 150 }}>
                                        {t("pages.admin.user.mobile")}
                                    </TableCell>
                                    <TableCell sx={{ minWidth: 150 }}>
                                        {t("pages.admin.user.status")}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            minWidth: 150,
                                            position: { xs: "static", sm: "sticky" },
                                            right: 0,
                                            backgroundColor: (theme) => theme.palette.background.paper,
                                            backgroundImage: (theme) => "var(--Paper-overlay)",
                                        }}
                                    >
                                        {t("pages.common.actions")}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.nickname}</TableCell>

                                        {/* tag */}
                                        <TableCell>
                                            <BaseDictTag
                                                dictKey={DICT_KEYS.Gender}
                                                value={user.gender}
                                            ></BaseDictTag>
                                            {/* <Chip label={user.gender} size="small" color="" /> */}
                                        </TableCell>
                                        <TableCell>{user.mobile}</TableCell>
                                        <TableCell>
                                            <BaseDictTag
                                                dictKey={DICT_KEYS.UserStatus}
                                                value={user.status}
                                            ></BaseDictTag>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                position: { xs: "static", sm: "sticky" },
                                                right: 0,
                                                backgroundColor: (theme) =>
                                                    theme.palette.background.paper,
                                                backgroundImage: (theme) => "var(--Paper-overlay)",
                                            }}
                                        >
                                            <Box sx={{ display: "flex", gap: 2 }}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleEdit(user.id)}
                                                >
                                                    {t("pages.common.edit")}
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    {t("pages.common.delete")}
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <BaseTablePagination
                        total={total}
                        page={page}
                        pageSize={pageSize}
                        pageSizeOptions={PAGE_SIZE_OPTIONS}
                        onPageSizeChange={handlePageSizeChange}
                        onPageChange={handleChangePage}
                    ></BaseTablePagination>
                </BaseCard>
            </Box>

            <BaseTableDeleteDialog
                deleteId={deleteId}
                loading={deleteLoading}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            ></BaseTableDeleteDialog>
        </>
    );
}