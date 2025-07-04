import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitFormComponent } from './visit-form.component'; // ✅ Correct class name

describe('VisitFormComponent', () => {
  let component: VisitFormComponent;
  let fixture: ComponentFixture<VisitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitFormComponent] // ✅ Use declarations
    }).compileComponents();

    fixture = TestBed.createComponent(VisitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
