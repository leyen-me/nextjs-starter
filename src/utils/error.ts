import { LabelType } from "@prisma/client";

// 国际化错误
// 客户端和服务端都能用
export class I18nError extends Error {
  messageType: string;
  constructor(message: string) {
    super(message);
    this.messageType = LabelType.I18N;
  }
}
