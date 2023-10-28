import { createAction, props } from "@ngrx/store";
import { ZipCodeItem } from "../../models/zip-codes.models";
import { ZIP_CODES } from "../../constants/zip-codes.constants";

export const loadZipCodes =  createAction(
  '[Zip Codes] Load'
);

export const loadZipCodesOK = createAction(
  '[Zip Codes] Load OK',
  props<{ data: ZipCodeItem[]}>()
);

export const loadZipCodesKO = createAction(
  '[Zip Codes] Load KO'
);

export const setZipCodesFilters = createAction(
  '[Zip Codes] Set Zip Codes Filters',
  props<{ filters: ZIP_CODES[] }>()
);
