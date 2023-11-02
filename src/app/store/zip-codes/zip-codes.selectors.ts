
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ZipCodeListItem, ZipCodesState } from "../../models/zip-codes.models"
import { ZIP_CODES, ZIP_CODES_FEATURE_KEY } from "../../constants/zip-codes.constants";
import { DropdownOption } from "../../models/search-form.models";

export const selectZipCodes = createFeatureSelector<ZipCodesState>(ZIP_CODES_FEATURE_KEY);

export const selectLoading = createSelector(
  selectZipCodes,
  (state: ZipCodesState): boolean => state.loading);

export const selectLoaded = createSelector(
  selectZipCodes,
  (state: ZipCodesState): boolean => state.loaded);

export const selectErrorLoading = createSelector(
  selectZipCodes,
  (state: ZipCodesState): boolean => state.errorLoading);

export const getLoadZipCodes = createSelector(
  selectLoading,
  selectLoaded,
  selectErrorLoading,
  (loading: boolean, loaded: boolean, error: boolean): boolean => (!loading && !loaded && !error));

export const getNavigateDashboard = createSelector(
  selectLoading,
  selectLoaded,
  selectErrorLoading,
  (loading: boolean, loaded: boolean, error: boolean): boolean => (!loading && loaded && !error));

export const getDisableByProvincesFilter = createSelector(
  selectZipCodes,
  (state: ZipCodesState): boolean => state?.provincesFilter?.length <= 0);

export const getZipCodesFiltered = createSelector(
  selectZipCodes,
  (state: ZipCodesState): DropdownOption[] => {
    const result: DropdownOption[] = state?.provincesFilter?.map((zipCode: ZIP_CODES) =>
      state.itemsList?.
        filter((item: ZipCodeListItem) => item.codi_postal.some(code => code.startsWith(zipCode))))?.
        flat()?.
        map((itemZipCode: ZipCodeListItem) => ({
          code: itemZipCode.codi_municipi,
          name: `${itemZipCode.nom_municipi} - (${itemZipCode.codi_postal.join(', ')})`
        }));
    return result;
  });

export const getZipCodesList = createSelector(
  selectZipCodes,
  (state: ZipCodesState): ZipCodeListItem[] => state.itemsList);
