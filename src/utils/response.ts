import { RESPONSE_CODE } from "@/contants";
import { LabelType } from "@prisma/client";
import { NextResponse } from "next/server";
import { ResponseType } from "@/app/(server)/(sys)/types";

export const buildSuccess = <T>({
  code = RESPONSE_CODE.SUCCESS,
  data = null as T,
  message = "server.common.success",
  messageType = LabelType.I18N,
}: {
  code?: number;
  data?: T;
  message?: string;
  messageType?: LabelType;
}): NextResponse<ResponseType<T>> => {
  return NextResponse.json(
    {
      code,
      message,
      messageType,
      data,
    },
    { status: RESPONSE_CODE.SUCCESS }
  );
};

export const buildError = ({
  code = RESPONSE_CODE.ERROR,
  message = "server.common.failed",
  messageType = LabelType.I18N,
}: {
  code?: number;
  message?: string;
  messageType?: LabelType;
}): NextResponse<ResponseType<null>> => {
  return NextResponse.json(
    {
      code,
      message,
      messageType,
      data: null,
    },
    { status: RESPONSE_CODE.SUCCESS }
  );
};
