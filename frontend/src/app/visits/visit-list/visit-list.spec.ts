import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitListComponent } from './visit-list.component';  // ✅ correct import

describe('VisitListComponent', () => {
  let component: VisitListComponent;
  let fixture: ComponentFixture<VisitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitListComponent] // ✅ declarations, not imports
    }).compileComponents();

    fixture = TestBed.createComponent(VisitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
