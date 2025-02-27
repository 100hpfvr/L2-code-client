import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionButtonService {

  constructor() { }

  buttonTemplateReference: TemplateRef<any> | undefined;

    setButtonTemplateReference(templateReference: TemplateRef<any>) {
        this.buttonTemplateReference = templateReference;
    }

    dispose() {
        this.buttonTemplateReference = undefined;
    }

}
