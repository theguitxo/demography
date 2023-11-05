import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ChartGroupComponent } from "./chart-group.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe(ChartGroupComponent.name, () => {
  let fixture: ComponentFixture<ChartGroupComponent>;
  let component: ChartGroupComponent;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ChartGroupComponent
      ]
    }).compileComponents();



    fixture = TestBed.createComponent(ChartGroupComponent);
    component = fixture.componentInstance;

    component.info = {
      menData: {
        value_0_to_14: 1,
        value_15_to_64: 1,
        value_65_to_plus: 1
      },
      womenData:  {
        value_0_to_14: 1,
        value_15_to_64: 1,
        value_65_to_plus: 1
      },
      totalData: {
        value_0_to_14: 1,
        value_15_to_64: 1,
        value_65_to_plus: 1
      },
      year: '2023'
    };

    fixture.autoDetectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
