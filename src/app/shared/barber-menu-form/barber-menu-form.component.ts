import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-barber-menu-form',
  templateUrl: './barber-menu-form.component.html',
  styleUrls: ['./barber-menu-form.component.scss']
})
export class BarberMenuFormComponent implements OnChanges {

  // ===============================
  // INPUTS
  // ===============================

  @Input() isOpen: boolean = false;

  @Input() isEditMode: boolean = false;

  @Input() service: any = null;


  // ===============================
  // OUTPUTS
  // ===============================

  @Output() closed = new EventEmitter<void>();

  @Output() submitted = new EventEmitter<any>();


  // ===============================
  // FORM DATA
  // ===============================

  formData = {
    name: '',
    price: null as number | null,
    description: '',
    durationMinutes: null as number | null
  };


  // ===============================
  // WATCH EDIT DATA
  // ===============================

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['service'] || changes['isEditMode']) {

      if (this.isEditMode && this.service) {

        this.formData = {
          name: this.service.name || '',
          price: this.service.price ?? null,
          description: this.service.description || '',
          durationMinutes: this.service.durationMinutes ?? null
        };

      } else {

        this.resetForm();

      }
    }
  }


  // ===============================
  // CLOSE FORM
  // ===============================

  close(): void {
    this.closed.emit();
  }


  // ===============================
  // SUBMIT FORM
  // ===============================

  submit(): void {

    if (
      !this.formData.name.trim() ||
      this.formData.price === null ||
      this.formData.durationMinutes === null
    ) {
      return;
    }

    this.submitted.emit({
      name: this.formData.name.trim(),
      price: this.formData.price,
      description: this.formData.description.trim(),
      durationMinutes: this.formData.durationMinutes
    });
  }


  // ===============================
  // RESET FORM
  // ===============================

  resetForm(): void {

    this.formData = {
      name: '',
      price: null,
      description: '',
      durationMinutes: null
    };
  }

}