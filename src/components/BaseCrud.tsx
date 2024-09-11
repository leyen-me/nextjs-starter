"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    TextField,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
    CircularProgress,
    Icon,
} from "@mui/material";
import { useI18n } from "@/components/I18nProvider";
import api from "@/utils/request";
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
import { CachedOutlined, ChevronRight, ExpandMore, SearchOutlined } from "@mui/icons-material";
import { BaseDictTag } from "@/components/BaseDictTag";
import { BaseTableDeleteDialog } from "@/components/BaseTableDeleteDialog";
import { useToast } from "@/components/ToastProvider";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { Add, Download } from "@mui/icons-material";
import { DataGrid } from '@mui/x-data-grid';
import { DataGridPremium, GridColDef, GridColType, GridRenderCellParams } from "@mui/x-data-grid-premium";
import { BaseDynamicIcon } from "./BaseDynamicIcon";

export type ResultColumn = {
    label: string;
    labelType: string;
    name: string;
    type: "index" | "actions" | "text" | "dict" | "icon";
    dictKey?: string;
    minWidth?: number;
};

export type BaseCrudType = "tree" | "page" | "list";

export type BaseCrudProps = {
    type?: BaseCrudType;
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
    type = "page",
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

    // 是否是树形结构
    const isTree = type === "tree";
    const isTreeOrList = isTree || type === "list";

    // 获取数据
    const fetchData = async () => {
        const fetchUrl = isTreeOrList ? `${baseUrl}/list` : `${baseUrl}/page`;
        const params = isTreeOrList ? getFilterWithRequest() : {
            page: page.toString(),
            pageSize: pageSize.toString(),
            ...getFilterWithRequest(),
        };
        const { data } = await api.get<any>(fetchUrl, {
            params: params as Record<string, string>,
        });
        if (isTreeOrList) {
            setData(data);
        } else {
            const { total: _total, data: _data } = data;
            setData(_data);
            setTotal(_total);
        }
    };

    const getTreeDataPath = (row: any) => {
        const path: string[] = [];
        let currentId: string | null = row.id;
        while (currentId) {
            path.unshift(currentId);
            currentId = data.find(item => item.id === currentId)?.pid || null;
        }
        return path;
    }

    const columns = resultColumns.map((column) => {
        let type: GridColType = "string"
        if (column.type === "text") {
            type = "string"
        } else if (column.type === "index") {
            type = "number"
        } else if (column.type === "dict") {
            type = "string"
        }

        const baseColumn = {
            field: column.name,
            headerAlign: "left",
            align: "left",
            headerName: column.labelType === LABEL_TYPE.I18N ? t(column.label) : column.label,
            type: type,
            minWidth: column.minWidth,
            flex: 1,
        }

        if (column.type === "index") {
            return {
                ...baseColumn,
                field: "id",
            }
        }
        if (column.type === "dict") {
            return {
                ...baseColumn,
                renderCell: (params: any) => (
                    params.value ? <BaseDictTag dictKey={column.dictKey || ""} value={params.value} /> : null
                )
            }
        }
        if (column.type === "icon") {
            return {
                ...baseColumn,
                type: "string",
                renderCell: (params: any) => (
                    params.value ? <BaseDynamicIcon name={params.value.replace("Icon", "")}></BaseDynamicIcon> : null
                )
            }
        }
        if (column.type === "actions") {
            return {
                ...baseColumn,
                renderCell: (params: any) => {
                    if(!params.id.search("auto-")){
                        return null
                    }
                    return <Box sx={{ display: "flex", height: "100%", alignItems: "center", gap: 2, mr: 100 }}>
                        <Button variant="outlined" color="primary" size="small" onClick={() => handleEdit(params.id)}>
                            {t("pages.common.edit")}
                        </Button>
                        <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(params.id)}>
                            {t("pages.common.delete")}
                        </Button>
                    </Box>
                }
                
            }
        }
        return baseColumn
    }).filter((column) => column !== null) as GridColDef<any>[]

    const dataComponentAttr = {
        autoHeight: true,
        rows: data,
        columns: columns,
        hideFooter: true,
        disableDensitySelector: true,
    }

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
                                    fullWidth={false}
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
                {isTree ? <DataGridPremium
                    initialState={{
                        // pagination: { paginationModel: { pageSize: 100 } },
                        columns: {
                            columnVisibilityModel: {
                                id: true,
                            },
                        },
                    }}
                    defaultGroupingExpansionDepth={-1}
                    treeData={isTree}
                    getRowId={(row) => row.id}
                    getTreeDataPath={getTreeDataPath}
                    groupingColDef={{
                        headerName: "分组",
                        hideable: false,
                    }}
                    {...dataComponentAttr}
                /> : <DataGridPremium
                    {...dataComponentAttr}
                />
                }
                {
                    !isTreeOrList && <BaseTablePagination

                        total={total}
                        page={page}
                        pageSize={pageSize}
                        pageSizeOptions={PAGE_SIZE_OPTIONS}
                        onPageSizeChange={handlePageSizeChange}
                        onPageChange={handleChangePage}
                    ></BaseTablePagination>
                }
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
