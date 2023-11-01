import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ChartLoadingComponent } from "./chart-loading.component";

describe(ChartLoadingComponent.name, () => {
  let fixture: ComponentFixture<ChartLoadingComponent>;
  let component: ChartLoadingComponent;
  
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ChartLoadingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartLoadingComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});