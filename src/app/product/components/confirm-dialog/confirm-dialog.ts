import { Component, HostListener, input, output } from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialogComponent {
  title = input<string>('Confirmación');
  message = input<string>('¿Estás seguro?');

  confirm = output<void>();
  cancel = output<void>();

  @HostListener('document:keydown.escape')
  onEscape() {
    this.cancel.emit();
  }
}
