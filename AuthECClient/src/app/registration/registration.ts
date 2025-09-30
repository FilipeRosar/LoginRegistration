import { Component } from '@angular/core';
import { 
  AbstractControl, 
  FormBuilder, 
  FormGroup, 
  ReactiveFormsModule, 
  ValidationErrors, 
  ValidatorFn, 
  Validators 
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.html',
  styles: ``
})
export class Registration {

  // ✅ Validator corrigido (sem setErrors)
  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;

    if (password && confirm && password.value !== confirm.value) {
      confirm?.setErrors({ passwordMismatch: true })
    }
    return null;
  };

  form: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/(?=.*[^a-zA-Z0-9])/) // pelo menos 1 caractere especial
          ]
        ],
        confirmPassword: ['', Validators.required], // ✅ agora é obrigatório
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('✅ Dados enviados:', this.form.value);
    } else {
      console.log('❌ Form inválido');
      this.form.markAllAsTouched();
    }
  }
}
