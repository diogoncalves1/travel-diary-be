import { Response } from "express";

export function success(
  res: Response,
  data: any = null,
  message = "OK",
  status = 200,
  meta?: any,
) {
  const payload: any = {
    success: true,
    message,
    data,
    errors: null,
  };

  if (meta) payload.meta = meta;
  return res.status(normalizeStatus(status, 200)).json(payload);
}

export function error(
  res: Response,
  errors: any = null,
  message = "Error",
  status = 500,
  meta?: any,
) {
  const payload: any = {
    success: false,
    message,
    data: null,
    errors,
  };
  if (meta) payload.meta = meta;

  return res.status(normalizeStatus(status, 500)).json(payload);
}

function normalizeStatus(status: any, defaultStatus: number): number {
  if (typeof status !== "number" || status < 100 || status > 511) {
    return defaultStatus;
  }
  return status;
}
