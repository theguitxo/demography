import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ChartContainerComponent } from "./chart-container.component";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ZipCodesState } from "../../../models/zip-codes.models";
import { zipCodesInitialState } from "../../../store/zip-codes/zip-codes.reducers";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { ChartDataItem } from "../../../models/chart-data.model";
import { selectChartInfo, selectHaveChartInfo } from "../../../store/chart-data/chart-data.selectors";

describe(ChartContainerComponent.name, () => {
  let fixture: ComponentFixture<ChartContainerComponent>;
  let component: ChartContainerComponent;
  let store: MockStore<ZipCodesState>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ChartContainerComponent
      ],
      providers: [
        provideMockStore({
          initialState: zipCodesInitialState,
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.refreshState();
    fixture = TestBed.createComponent(ChartContainerComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message when not have chart info', () => {
    store.overrideSelector(selectHaveChartInfo, false);
    store.refreshState();

    fixture.detectChanges();

    const itemErrorMessage = fixture.debugElement.query(By.css('p-messages'));
    expect(itemErrorMessage).toBeTruthy();
  });

  it('should show chart info component when data is available', () => {
    const chartInfoData: ChartDataItem[] = [
      {
        year: '2023',
        menData: {
          value_0_to_14: 1,
          value_15_to_64: 1,
          value_65_to_plus: 1
        },
        womenData: {
          value_0_to_14: 1,
          value_15_to_64: 1,
          value_65_to_plus: 1
        },
        totalData: {
          value_0_to_14: 1,
          value_15_to_64: 1,
          value_65_to_plus: 1
        }
      }
    ];

    store.overrideSelector(selectChartInfo, chartInfoData);
    store.overrideSelector(selectHaveChartInfo, true);
    store.refreshState();

    fixture.detectChanges();

    const itemChartGroup = fixture.debugElement.query(By.css('demography-chart-group'));

    expect(itemChartGroup).toBeTruthy();
    expect(itemChartGroup.childNodes?.length).toBe(1);
  });
});