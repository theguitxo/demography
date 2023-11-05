import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ChartPopulationComponent } from "./chart-population.component";

describe(ChartPopulationComponent.name, () => {
  let fixture: ComponentFixture<ChartPopulationComponent>;
  let component: ChartPopulationComponent;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ChartPopulationComponent
      ]
    }).compileComponents();



    fixture = TestBed.createComponent(ChartPopulationComponent);
    component = fixture.componentInstance;

    component.title = 'testing';
    component.info = {
      value_0_to_14:1,
      value_15_to_64: 1,
      value_65_to_plus: 1
    };

    fixture.autoDetectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total of population', () => {
    const expected = '3 hab.';

    expect(component.total).toEqual(expected);
  });
});