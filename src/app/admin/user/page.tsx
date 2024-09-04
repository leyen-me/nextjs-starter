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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import { useI18n } from "@/components/I18nProvider";
import { Gender, UserStatus } from "@prisma/client";
import api from "@/utils/request";
import type { Page } from "@/types";
import { DEFAULT_PAGE_SIZE, DICT_KEYS, PAGE_SIZE_OPTIONS } from "@/contants";
import { BaseTablePagination } from "@/components/BaseTablePagination";
import { BaseCard } from "@/components/BaseCard";
import { useFilter } from "@/hooks/useFilter";
import type {
  UserPageFilters,
  UserWithoutPassword,
} from "@/app/api/user/page/route";
import { BaseDictSelect } from "@/components/BaseDictSelect";
import { CachedOutlined, SearchOutlined } from "@mui/icons-material";
import { BaseDictTag } from "@/components/BaseDictTag";

const UserPage = () => {
  const { t } = useI18n();

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [users, setUsers] = useState<UserWithoutPassword[]>([]);
  const { filters, handleFilterChange, handleReset } =
    useFilter<UserPageFilters>({
      email: "",
      nickname: "",
      gender: "" as Gender,
      mobile: "",
      status: "" as UserStatus,
    });

  const fetchModels = async () => {
    const { data } = await api.get<Page<UserWithoutPassword>>(
      "/api/user/page",
      {
        params: {
          page: page.toString(),
          pageSize: pageSize.toString(),
          ...filters,
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
    console.log(id);
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
    <Box sx={{ width: "100%" }}>
      <BaseCard title={t("pages.common.filter")}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextField
            label={t("pages.admin.user.email")}
            variant="outlined"
            name="email"
            value={filters.email}
            onChange={handleFilterChange}
            size="small"
          />
          <TextField
            label={t("pages.admin.user.nickname")}
            variant="outlined"
            name="nickname"
            value={filters.nickname}
            onChange={handleFilterChange}
            size="small"
          />
          <BaseDictSelect
            dictKey={DICT_KEYS.Gender}
            label={t("pages.admin.user.gender")}
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
          ></BaseDictSelect>
          <TextField
            label={t("pages.admin.user.mobile")}
            variant="outlined"
            name="mobile"
            value={filters.mobile}
            onChange={handleFilterChange}
            size="small"
          />
          <BaseDictSelect
            dictKey={DICT_KEYS.UserStatus}
            label={t("pages.admin.user.status")}
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          ></BaseDictSelect>
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
  );
};

export default UserPage;
