import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useI18n } from "./I18nProvider";

type BaseTableDeleteDialogProps = {
    deleteId: string;
    loading: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function BaseTableDeleteDialog({
    deleteId,
    loading,
    onClose,
    onConfirm,
}: BaseTableDeleteDialogProps) {
    const { t } = useI18n();
    return (
        <Dialog
            open={!!deleteId}
            onClose={onClose}
        >
            <DialogTitle>
                {t("pages.common.delete")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t("pages.common.deleteConfirm")}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    {t("pages.common.cancel")}
                </Button>
                <Button onClick={onConfirm} disabled={loading}>
                    {loading && (
                        <CircularProgress className="mr-4" color="inherit" size={16} />
                    )}
                    {t("pages.common.delete")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}