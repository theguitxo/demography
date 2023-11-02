import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ZipCodesState } from "../../../models/zip-codes.models";
import { zipCodesInitialState } from "../../../store/zip-codes/zip-codes.reducers";
import { selectCanLoadChartData, selectZipCodeSelected } from "../../../store/chart-data/chart-data.selectors";
import { DashboardMainComponent } from "./dashboard-main.component";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe(DashboardMainComponent.name, () => {
  let fixture: ComponentFixture<DashboardMainComponent>;
  let component: DashboardMainComponent;
  let store: MockStore<ZipCodesState>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardMainComponent,
      ],
      providers: [
        provideMockStore({
          initialState: zipCodesInitialState,
          selectors: [
            {
              selector: selectCanLoadChartData,
              value: {
                value: true,
                code: ''
              }
            },
            {
              selector: selectZipCodeSelected,
              value: ''
            }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.refreshState();
    fixture = TestBed.createComponent(DashboardMainComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show chart info components when zip code is selected', () => {
    store.overrideSelector(selectZipCodeSelected, '43700');
    store.refreshState();

    fixture.detectChanges();

    const itemDemographyCityTitle = fixture.debugElement.query(By.css('demography-city-title'));
    expect(itemDemographyCityTitle).toBeTruthy();
  });
});