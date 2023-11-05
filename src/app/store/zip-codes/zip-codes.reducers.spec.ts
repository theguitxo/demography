import { ZIP_CODES } from '../../constants/zip-codes.constants';
import { ZipCodesState } from '../../models/zip-codes.models';
import { loadZipCodes, loadZipCodesKO, loadZipCodesOK, setZipCodesFilters } from './zip-codes.actions';
import * as zipCodesReducer from './zip-codes.reducers';

describe('Zip Codes Reducer', () => {
  it('unknow action: should return the default state', () => {
    const { zipCodesInitialState } = zipCodesReducer;
    const action = {
      type: 'Unknown',
    };

    const state = zipCodesReducer.zipCodesReducer(zipCodesInitialState, action);

    expect(state).toBe(zipCodesInitialState);
  });

  it('load zip codes: should return the state when inits the action for load the zip codes', () => {
    const expected: ZipCodesState = {
      ...zipCodesReducer.zipCodesInitialState,
      loaded: false,
      loading: true,
      errorLoading: false
    };
    const action = loadZipCodes();

    const state = zipCodesReducer.zipCodesReducer(zipCodesReducer.zipCodesInitialState, action);

    expect(state).toEqual(expected);
  });

  it('load zip codes OK: should return the state when finish the load zip codes action OK', () => {
    const expected: ZipCodesState = {
      ...zipCodesReducer.zipCodesInitialState,
      loaded: true,
      loading: false,
      errorLoading: false,
      itemsList: [
        {
          codi_municipi: '080018',
          codi_postal: ['08630'],
          nom_municipi: 'Abrera'
        },
        {
          codi_municipi: '080023',
          codi_postal: ['08256', '08281'],
          nom_municipi: 'Aguilar de Segarra'
        }
      ]
    };
    const action = loadZipCodesOK({
      data: [
        {
          "identificador": "0001",
          "codi_postal": "08630",
          "codi_municipi": "080018",
          "nom_municipi": "Abrera"
        },
        {
          "identificador": "0002",
          "codi_postal": "08256",
          "codi_municipi": "080023",
          "nom_municipi": "Aguilar de Segarra"
        },
        {
          "identificador": "0003",
          "codi_postal": "08281",
          "codi_municipi": "080023",
          "nom_municipi": "Aguilar de Segarra"
        },
      ]
    });

    const state = zipCodesReducer.zipCodesReducer(zipCodesReducer.zipCodesInitialState, action);

    expect(state).toEqual(expected);
  });

  it('load zip codes KO: hould return the state when finish the load zip codes action KO', () => {
    const expected: ZipCodesState = {
      ...zipCodesReducer.zipCodesInitialState,
      loaded: true,
      loading: false,
      errorLoading: true
    };
    const action = loadZipCodesKO();

    const state = zipCodesReducer.zipCodesReducer(zipCodesReducer.zipCodesInitialState, action);

    expect(state).toEqual(expected);
  });

  it('set zip codes filters: should return the state on set filters for zip codes', () => {
    const expected: ZipCodesState = {
      ...zipCodesReducer.zipCodesInitialState,
      provincesFilter: [ZIP_CODES.TARRAGONA]
    };
    const action = setZipCodesFilters({
      filters: [ZIP_CODES.TARRAGONA]
    });

    const state = zipCodesReducer.zipCodesReducer(zipCodesReducer.zipCodesInitialState, action);

    expect(state).toEqual(expected);
  });
});
