import { LabelType } from "@prisma/client";

export class I18nError extends Error {
  messageType: string;
  constructor(message: string) {
    super(message);
    this.messageType = LabelType.I18N;
  }
}
