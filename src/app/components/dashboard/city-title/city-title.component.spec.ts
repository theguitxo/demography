import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CityTitleComponent } from "./city-title.component";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ZipCodesState } from "../../../models/zip-codes.models";
import { zipCodesInitialState } from "../../../store/zip-codes/zip-codes.reducers";
import { selectCityName } from "../../../store/chart-data/chart-data.selectors";

describe(CityTitleComponent.name, () => {
  let fixture: ComponentFixture<CityTitleComponent>;
  let component: CityTitleComponent;
  let store: MockStore<ZipCodesState>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [CityTitleComponent],
      providers: [
        provideMockStore({
          initialState: zipCodesInitialState,
          selectors: [
            {
              selector: selectCityName,
              value: 'title'
            }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.refreshState();
    fixture = TestBed.createComponent(CityTitleComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});