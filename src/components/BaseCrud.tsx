"use client";

import React, { useEffect, useRef, useState } from "react";
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
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
    CircularProgress,
} from "@mui/material";
import { useI18n } from "@/components/I18nProvider";
import api from "@/utils/request";
import type { Page } from "@/types";
import {
    ADD_ID,
    DEFAULT_PAGE_SIZE,
    LABEL_TYPE,
    PAGE_SIZE_OPTIONS,
} from "@/contants";
import { BaseTablePagination } from "@/components/BaseTablePagination";
import { BaseCard } from "@/components/BaseCard";
import { FiltersOption, useFilter } from "@/hooks/useFilter";
import { BaseDictSelect } from "@/components/BaseDictSelect";
import { CachedOutlined, SearchOutlined } from "@mui/icons-material";
import { BaseDictTag } from "@/components/BaseDictTag";
import { BaseTableDeleteDialog } from "@/components/BaseTableDeleteDialog";
import { useToast } from "@/components/ToastProvider";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { Add, Download } from "@mui/icons-material";

export type ResultColumn = {
    label: string;
    labelType: string;
    name: string;
    type: "index" | "actions" | "text" | "dict";
    dictKey?: string;
    minWidth?: number;
};

export type BaseCrudProps = {
    baseUrl: string;
    filtersOptions: FiltersOption[];
    resultColumns: ResultColumn[];
    SavePage: any;
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function BaseCrud({
    baseUrl,
    filtersOptions,
    resultColumns,
    SavePage,
}: BaseCrudProps) {
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

    // 修改
    const [editId, setEditId] = useState<string>("");
    const [editLoading, setEditLoading] = useState(false);
    const savePageRef = useRef<any>(null);

    // 数据
    const [data, setData] = useState<any[]>([]);

    // 过滤
    const { filters, handleFilterChange, handleReset, getFilterWithRequest } =
        useFilter(filtersOptions);

    // 获取数据
    const fetchData = async () => {
        const { data } = await api.get<Page<any>>(`${baseUrl}/page`, {
            params: {
                page: page.toString(),
                pageSize: pageSize.toString(),
                ...getFilterWithRequest(),
            },
        });
        const { total: _total, data: _data } = data;
        setData(_data);
        setTotal(_total);
    };

    const handleSearch = () => {
        fetchData();
    };

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (pageSize: number) => {
        setPageSize(pageSize);
    };

    const handleEdit = (id: string) => {
        setEditId(id);
    };

    const handleEditCancel = () => {
        setEditId("");
    };

    const handleEditConfirm = () => {
        savePageRef.current?.submit();
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
            fetchData();
            showToast(t("pages.common.deleteSuccess"), "success");
        } catch (error) {
            showToast(t("pages.common.deleteFailed"), "error");
        } finally {
            handleDeleteCancel();
            setDeleteLoading(false);
        }
    };

    const handleExport = () => {
        console.log("export");
    };

    const handleAdd = () => {
        setEditId(ADD_ID);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <BaseCard title={t("pages.common.filter")}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {filters.map((option) => {
                        if (option.type === "text") {
                            return (
                                <TextField
                                    key={option.name}
                                    label={
                                        option.labelType === LABEL_TYPE.I18N
                                            ? t(option.label)
                                            : option.label
                                    }
                                    variant="outlined"
                                    name={option.name}
                                    value={option.value}
                                    onChange={handleFilterChange}
                                    size="small"
                                />
                            );
                        } else if (option.type === "dict") {
                            return (
                                <BaseDictSelect
                                    key={option.name}
                                    dictKey={option.dictKey || ""}
                                    label={
                                        option.labelType === LABEL_TYPE.I18N
                                            ? t(option.label)
                                            : option.label
                                    }
                                    name={option.name}
                                    value={option.value as string}
                                    onChange={handleFilterChange}
                                ></BaseDictSelect>
                            );
                        }
                    })}
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
            <BaseCard
                title={t("pages.common.results")}
                action={
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<Download />}
                            onClick={handleExport}
                        >
                            {t("pages.common.export")}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAdd}
                            startIcon={<Add />}
                        >
                            {t("pages.common.add")}
                        </Button>
                    </Box>
                }
            >
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {resultColumns.map((column) => {
                                    if (column.type === "actions") {
                                        return (
                                            <TableCell
                                                key={column.name}
                                                sx={{
                                                    minWidth: column.minWidth,
                                                    position: { xs: "static", sm: "sticky" },
                                                    right: 0,
                                                    backgroundColor: (theme) =>
                                                        theme.palette.background.paper,
                                                    backgroundImage: (theme) => "var(--Paper-overlay)",
                                                }}
                                            >
                                                {column.labelType === LABEL_TYPE.I18N
                                                    ? t(column.label)
                                                    : column.label}
                                            </TableCell>
                                        );
                                    }
                                    return (
                                        <TableCell
                                            key={column.name}
                                            sx={{ minWidth: column.minWidth }}
                                        >
                                            {column.labelType === LABEL_TYPE.I18N
                                                ? t(column.label)
                                                : column.label}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((model, index) => (
                                <TableRow key={model.id}>
                                    {resultColumns.map((column) => {
                                        if (column.type === "index") {
                                            return (
                                                <TableCell key={column.name}>{index + 1}</TableCell>
                                            );
                                        }
                                        if (column.type === "text") {
                                            return (
                                                <TableCell key={column.name}>
                                                    {model[column.name]}
                                                </TableCell>
                                            );
                                        }
                                        if (column.type === "dict") {
                                            return (
                                                <TableCell key={column.name}>
                                                    <BaseDictTag
                                                        dictKey={column.dictKey || ""}
                                                        value={model[column.name]}
                                                    ></BaseDictTag>
                                                </TableCell>
                                            );
                                        }
                                        if (column.type === "actions") {
                                            return (
                                                <TableCell
                                                    key={column.name}
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
                                                            aria-hidden="false"
                                                            variant="outlined"
                                                            onClick={() => handleEdit(model.id)}
                                                        >
                                                            {t("pages.common.edit")}
                                                        </Button>
                                                        <Button
                                                            aria-hidden="false"
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={() => handleDelete(model.id)}
                                                        >
                                                            {t("pages.common.delete")}
                                                        </Button>
                                                    </Box>
                                                </TableCell>
                                            );
                                        }
                                    })}
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
            <BaseTableDeleteDialog
                deleteId={deleteId}
                loading={deleteLoading}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            ></BaseTableDeleteDialog>
            <Dialog
                fullScreen
                open={!!editId}
                onClose={handleEditCancel}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleEditCancel}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {t("pages.common.edit")}
                        </Typography>
                        <Button
                            autoFocus
                            color="inherit"
                            onClick={handleEditConfirm}
                            disabled={editLoading}
                        >
                            {editLoading && <CircularProgress size={16} sx={{ mr: 1 }} />}{" "}
                            {t("pages.common.save")}
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box
                    sx={{
                        height: "100%",
                        p: 2,
                        backgroundColor: (theme) =>
                            theme.palette.mode === "dark" ? "#121212" : "#f0f0f0",
                    }}
                >
                    <SavePage
                        ref={savePageRef}
                        id={editId}
                        baseUrl={baseUrl}
                        editLoading={editLoading}
                        setEditLoading={setEditLoading}
                        onClose={handleEditCancel}
                        onRefresh={fetchData}
                    ></SavePage>
                </Box>
            </Dialog>
        </>
    );
}
