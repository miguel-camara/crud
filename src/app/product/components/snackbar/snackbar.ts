import { Component, input, output } from '@angular/core';
import { types } from '../../interfaces/custom.interafce';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.html',
})
export class Snackbar {
  message = input<string>('');
  typeSnack = input<types>('info');
  close = output<void>();
}
