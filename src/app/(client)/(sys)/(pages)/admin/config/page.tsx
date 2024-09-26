"use client";

import { BaseAuthority } from "@/components/BaseAuthority";
import { useI18n } from "@/components/I18nProvider";
import { useToast } from "@/components/ToastProvider";
import api from "@/utils/request";
import { Save } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

export default function ConfigPage() {
  const { t } = useI18n();
  const [config, setConfig] = useState<any>("");
  const { showSuccess, showError } = useToast();

  const fetchConfig = async () => {
    const res = await api.get("/api/config");
    setConfig(res.data);
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async () => {
    try {
      const res = await api.put("/api/config", config);
      showSuccess(res);
      fetchConfig();
    } catch (error: any) {
      showError(error);
    }
  };

  return (
    <Card sx={{ marginBottom: 2, padding: 2 }}>
      <CardHeader
        title={"Config"}
        titleTypographyProps={{ variant: "h6" }}
        action={
          <Box sx={{ display: "flex", gap: 2 }}>
            <BaseAuthority auth="sys:config:edit">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={!config}
                startIcon={<Save />}
              >
                {t("pages.common.save")}
              </Button>
            </BaseAuthority>
          </Box>
        }
      />
      <CardContent>
        <JsonView src={config} displayArrayIndex={true} editable />
      </CardContent>
    </Card>
  );
}
