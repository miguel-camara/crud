import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { Snackbar } from '../components/snackbar/snackbar';
import { types } from '../interfaces/custom.interafce';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private isVisible = false;
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  open(message: string, type: types = 'info', duration = 3000) {
    if (this.isVisible) return;

    this.isVisible = true;

    const componentRef = createComponent(Snackbar, {
      environmentInjector: this.injector,
    });

    componentRef.setInput('message', message);
    componentRef.setInput('typeSnack', type);
    // componentRef.instance.message = message;

    this.appRef.attachView(componentRef.hostView);

    componentRef.instance.close.subscribe(() => {
      this.appRef.detachView(componentRef.hostView);

      componentRef.destroy();

      this.isVisible = false;
    });

    const domElement = componentRef.location.nativeElement as HTMLDivElement;

    document.body.appendChild(domElement);

    domElement.style.position = 'fixed';
    domElement.style.bottom = '24px';
    domElement.style.right = '24px';

    domElement.style.zIndex = '2000';

    setTimeout(() => {
      this.appRef.detachView(componentRef.hostView);

      componentRef.destroy();

      this.isVisible = false;
    }, duration);
  }
}
