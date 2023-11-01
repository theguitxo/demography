import { ZIP_CODES } from "../../constants/zip-codes.constants";
import { DropdownOption } from "../../models/search-form.models";
import { ZipCodesState } from "../../models/zip-codes.models";
import * as SELECTORS from "./zip-codes.selectors";

describe('zip codes selectors', () => {
  const initialState: ZipCodesState = {
    errorLoading: false,
    itemsList: [],
    loaded: false,
    loading: false,
    provincesFilter: []
  };

  const withProvincesFilter: ZipCodesState = {
    ...initialState,
    provincesFilter: [ZIP_CODES.BARCELONA, ZIP_CODES.TARRAGONA]
  };

  const withZipCodes: ZipCodesState = {
    ...initialState,
    provincesFilter: [ZIP_CODES.TARRAGONA],
    itemsList: [
      {
        "codi_postal": ["43001", "43002", "43003", "43004"],
        "codi_municipi": "431482",
        "nom_municipi": "Tarragona"
      },
      {
        "codi_postal": ["43830"],
        "codi_municipi": "431536",
        "nom_municipi": "Torredembarra"
      },
      {
        "codi_postal": ["43559"],
        "codi_municipi": "431567",
        "nom_municipi": "Ulldecona"
      }
    ]
  }

  it('should select loading value', () => {
    const result = SELECTORS.selectLoading.projector(initialState);
    expect(result).toBeFalsy();
  });

  it('should select loaded value', () => {
    const result = SELECTORS.selectLoaded.projector(initialState);
    expect(result).toBeFalsy();
  });
  
  it('should select error loading value', () => {
    const result = SELECTORS.selectErrorLoading.projector(initialState);
    expect(result).toBeFalsy();
  });
  
  it('should select loading value', () => {
    const result = SELECTORS.getLoadZipCodes.projector(
      initialState.loading,
      initialState.loaded,
      initialState.errorLoading
    );
    expect(result).toBeTruthy();
  });
  
  it('should select navigate to dashboard', () => {
    const result = SELECTORS.getNavigateDashboard.projector(
      false, true, false
    );
    expect(result).toBeTruthy();
  });

  it('should select disable by provinces filter', () => {
    const result = SELECTORS.getDisableByProvincesFilter.projector(
      withProvincesFilter
    );
    expect(result).toBeFalsy();
  });

  it('should select zip codes filtered', () => {
    const result = SELECTORS.getZipCodesFiltered.projector(
      withZipCodes
    );

    const expected: DropdownOption[] = withZipCodes.itemsList.map((item) => ({
      code: item.codi_municipi,
      name: `${item.nom_municipi} - (${item.codi_postal.join(', ')})`
    }));
    expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
  });

  it('should select zip codes list', () => {
    const result = SELECTORS.getZipCodesList.projector(
      withZipCodes
    );
    expect(result.length).toEqual(3);
  });
});
