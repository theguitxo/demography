import { createReducer, on } from "@ngrx/store";
import { ZipCodeItem, ZipCodeListItem, ZipCodesState } from "../../models/zip-codes.models";
import { loadZipCodes, loadZipCodesKO, loadZipCodesOK, setZipCodesFilters } from "./zip-codes.actions";
import { SPECIAL_ZIP_CODES, ZIP_CODES } from "../../constants/zip-codes.constants";

export const zipCodesInitialState: ZipCodesState = {
  loading: false,
  loaded: false,
  errorLoading: false,
  itemsList: [],
  provincesFilter: []
};

export const zipCodesReducer = createReducer(
  zipCodesInitialState,
  on(loadZipCodes, (state) => ({ ..._loadZipCodes(state) }) ),
  on(loadZipCodesOK, (state, { data }) => ({ ..._loadZipCodesOK(state, data) })),
  on(loadZipCodesKO, (state) => ({ ..._loadZipCodesKO(state) })),
  on(setZipCodesFilters, (state, { filters }) => ({ ..._setZipCodesFilters(state, filters) }))
);

function _loadZipCodes(state: ZipCodesState): ZipCodesState {
  return {
    ...state,
    loaded: false,
    loading: true,
    errorLoading: false
  }
}

function _loadZipCodesOK(state: ZipCodesState, data: ZipCodeItem[]): ZipCodesState {
  const filteredList = [...data].filter(item => item.codi_postal !== SPECIAL_ZIP_CODES.NO_CONSTA && item.codi_postal !== SPECIAL_ZIP_CODES.OTROS_DIVERSOS);
  const listMap: Map<string, ZipCodeListItem> = new Map();

  filteredList.forEach((item: ZipCodeItem) => {
    if (!!listMap.get(item.codi_municipi)) {
      const temp = listMap.get(item.codi_municipi);
      temp!.codi_postal.push(item.codi_postal);
      listMap.set(item.codi_municipi, temp!);
    } else {
      listMap.set(item.codi_municipi,
        {
          codi_municipi: item.codi_municipi,
          codi_postal: [item.codi_postal],
          nom_municipi: item.nom_municipi
        }
      );
    }
  });

  return {
    ...state,
    loaded: true,
    loading: false,
    itemsList: Array.from(listMap, (item => {
      return {
        codi_municipi: item[1].codi_municipi,
        codi_postal: item[1].codi_postal,
        nom_municipi: item[1].nom_municipi
      }
    }))
  }
}

function _loadZipCodesKO(state: ZipCodesState): ZipCodesState {
  return {
    ...state,
    loaded: true,
    loading: false,
    errorLoading: true
  }
}

function _setZipCodesFilters(state: ZipCodesState, filters: ZIP_CODES[]): ZipCodesState {
  return {
    ...state,
    provincesFilter: filters
  }
}
