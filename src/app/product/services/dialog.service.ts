import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  confirm(title: string, message: string): Promise<boolean> {
    return new Promise((resolve) => {
      const componentRef = createComponent(ConfirmDialogComponent, {
        environmentInjector: this.injector,
      });

      componentRef.setInput('title', title);
      componentRef.setInput('message', message);

      componentRef.instance.confirm.subscribe(() => {
        resolve(true);
        this.close(componentRef);
      });

      componentRef.instance.cancel.subscribe(() => {
        resolve(false);
        this.close(componentRef);
      });

      this.appRef.attachView(componentRef.hostView);

      document.body.appendChild(componentRef.location.nativeElement);
    });
  }

  private close(componentRef: any) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
