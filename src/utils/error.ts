
export class I18nError extends Error {
    messageType: string;
    constructor(message: string) {
        super(message);
        this.messageType = "i18n";
    }
}