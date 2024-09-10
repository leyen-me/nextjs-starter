import { LabelType, RESPONSE_CODE } from "@/contants";
import { NextResponse } from "next/server";

export type ResponseType<T> = {
    code: number;
    message: string;
    messageType: LabelType;
    data: T;
}

export const buildSuccess = <T>({
    data = null as T,
    message = "server.common.success",
    messageType = "i18n",
}: {
    data?: T;
    message?: string;
    messageType?: LabelType;
}): NextResponse<ResponseType<T>> => {
    return NextResponse.json({
        code: RESPONSE_CODE.SUCCESS,
        message,
        messageType,
        data,
    }, { status: RESPONSE_CODE.SUCCESS });
};

export const buildError = ({
    message = "server.common.failed",
    messageType = "i18n",
}: {
    message: string;
    messageType?: LabelType;
}): NextResponse<ResponseType<null>> => {
    return NextResponse.json({
        code: RESPONSE_CODE.ERROR,
        message,
        messageType,
        data: null,
    }, { status: RESPONSE_CODE.ERROR });
};