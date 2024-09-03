import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useI18n } from "./I18nProvider";

type BaseTablePaginationProps = {
  total: number;
  page: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (page: number) => void;
};

export function BaseTablePagination({
  total,
  pageSize,
  pageSizeOptions,
  page,
  onPageSizeChange,
  onPageChange,
}: BaseTablePaginationProps) {
  const { t } = useI18n();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "center", sm: "space-between" },
        marginTop: 4,
      }}
    >
      <Box sx={{ alignItems: "center", display: { xs: "none", sm: "flex" } }}>
        <FormControl
          variant="outlined"
          size="small"
          sx={{
            minWidth: 120,
            marginRight: 2,
          }}
        >
          <InputLabel>{t("pages.common.pageSize")}</InputLabel>
          <Select
            label={t("pages.common.pageSize")}
            name="pageSize"
            value={pageSize.toString()}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2" sx={{ marginRight: 1 }}>
          {t("pages.common.total")}: {total}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginRight: 2,
        }}
      >
        <Pagination
          count={Math.ceil(total / pageSize)}
          page={page}
          size="large"
          onChange={(event, value) => onPageChange(value)}
          color="primary"
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
        />
        <Box
          sx={{
            alignItems: "center",
            display: { xs: "none", sm: "flex" },
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            sx={{ marginLeft: 2, width: 60 }}
            value={page}
            onChange={(e) => {
              const pageNumber = Number(e.target.value);
              if (
                !isNaN(pageNumber) &&
                pageNumber > 0 &&
                pageNumber <= Math.ceil(total / pageSize)
              ) {
                onPageChange(pageNumber);
              }
            }}
            inputProps={{ style: { textAlign: "center" } }}
          />
        </Box>
      </Box>
    </Box>
  );
}
