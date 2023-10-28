import { ZIP_CODES } from "../constants/zip-codes.constants";

export interface ZipCodeCheckBox {
  value: ZIP_CODES,
  label: string,
  checked: boolean
};

export interface DropdownOption {
  name: string;
  code: string;
}
