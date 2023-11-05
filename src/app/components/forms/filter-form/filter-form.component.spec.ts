import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ZipCodesState } from "../../../models/zip-codes.models";
import { FilterFormComponent } from "./filter-form.component";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { zipCodesInitialState } from "../../../store/zip-codes/zip-codes.reducers";
import { ZIP_CODES } from "../../../constants/zip-codes.constants";
import { resetChartData, setZipCodeSelected } from "../../../store/chart-data/chart-data.actions";
import { setZipCodesFilters } from "../../../store/zip-codes/zip-codes.actions";

describe(FilterFormComponent.name, () => {
  let fixture: ComponentFixture<FilterFormComponent>;
  let component: FilterFormComponent;
  let store: MockStore<ZipCodesState>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        FilterFormComponent,
      ],
      providers: [
        provideMockStore({
          initialState: zipCodesInitialState,
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.refreshState();
    fixture = TestBed.createComponent(FilterFormComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call actions to filter zip codes and reset chart data on change province', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    component.handleChangeProvince({
      originalEvent: new Event('change'),
      value: ZIP_CODES.LLEIDA
    });

    expect(dispatchSpy).toHaveBeenCalledWith(resetChartData());
    expect(dispatchSpy).toHaveBeenCalledWith(setZipCodesFilters({
      filters: [ZIP_CODES.LLEIDA, ZIP_CODES.TREMP]
    }));
  });

  it('should call action to set code to filter city and reset chart data on change city', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    component.handleChangeCity({
      originalEvent: new Event('change'),
      value: 'code'
    });

    expect(dispatchSpy).toHaveBeenCalledWith(resetChartData());
    expect(dispatchSpy).toHaveBeenCalledWith(setZipCodeSelected({
      code: 'code'
    }));
  });

  it('should call action to reset chart data on clear city selector', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    component.handleClearCity();

    expect(dispatchSpy).toHaveBeenCalledWith(resetChartData());
  });
});
