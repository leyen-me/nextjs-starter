import { LABEL_TYPE } from "@/contants";

export class I18nError extends Error {
  messageType: string;
  constructor(message: string) {
    super(message);
    this.messageType = LABEL_TYPE.I18N;
  }
}
