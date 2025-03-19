import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

@Directive({
    selector: '[validateControl]',
    standalone: true,
})
export class ValidateControlDirective {
    @Input('validateControl') control: FormControl | undefined;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.addRequiredIndicator();
        this.control?.statusChanges.subscribe(() => {
            const errorMessage = this.getErrorMessage();
            if (errorMessage) {
                this.showError(errorMessage);
            } else {
                this.hideError();
            }
        });
    }

    private getErrorMessage(): string | null {
        if (this.isControlInvalid()) {
            return this.getControlError();
        }
        return '';
    }

    private isControlInvalid(): boolean {
        return this.control!.invalid && (this.control!.dirty || this.control!.touched);
    }

    private getControlError(): string | null {
        const errors = this.control?.errors;
        if (errors) {
            return this.getErrorBasedOnType(errors);
        }
        return null;
    }

    private getErrorBasedOnType(errors: ValidationErrors): string {
        if (errors['required']) {
            return 'Campo obrigatório.';
        } else if (errors['minlength']) {
            return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;
        } else if (errors['maxlength']) {
            return `Máximo de ${errors['maxlength'].requiredLength} caracteres.`;
        } else if (errors['email']) {
            return 'E-mail inválido.';
        } else if (errors['pattern']) {
            return 'Padrão inválido.';
        } else if (errors['mask']) {
            return 'Formato obrigatório: ' + errors['mask'].requiredMask;
        } else if (errors['cpfInvalid']) {
            return 'CPF inválido.';
        } else if (errors['cnpjInvalid']) {
            return 'CNPJ inválido.';
        } else if (errors['validUrl']) {
            return 'Url inválida.';
        } else if (errors['matching'] === false) {
            return 'A senha de confirmação deve ser igual a senha informada';
        }
        return '';
    }

    private showError(errorMessage: string) {
        const errorSpan = this.createErrorElement(errorMessage);
        const parentElement = this.el.nativeElement?.parentNode;
        if (parentElement.classList.contains('p-inputgroup')) {
            this.appendErrorToParent(parentElement?.parentNode, errorSpan);
        } else if (parentElement?.parentNode.classList.contains('p-inputgroup')) {
            let outerElement = parentElement?.parentNode?.parentNode;
            this.appendErrorToParent(outerElement, errorSpan);
        }else if (parentElement?.parentNode.tagName == 'P-FLOATLABEL') {
            this.appendErrorToParent(parentElement?.parentNode, errorSpan);
        } else {
            this.appendErrorToParent(parentElement, errorSpan);
        }
    }

    private createErrorElement(errorMessage: string): HTMLElement {
        const errorSpan = this.renderer.createElement('small');
        const text = this.renderer.createText(errorMessage);
        this.renderer.addClass(errorSpan, 'text-red-500');
        this.renderer.appendChild(errorSpan, text);
        return errorSpan;
    }

    private appendErrorToParent(parent: HTMLElement, errorSpan: HTMLElement) {
        const hasSmallElement = Array.from(parent.children).some((elem: any) => elem.tagName === 'SMALL');
        if (!hasSmallElement) {
            this.renderer.appendChild(parent, errorSpan);
        } else {
            this.replaceError(parent, errorSpan);
        }
    }

    private replaceError(parent: HTMLElement, errorSpan: HTMLElement) {
        Array.from(parent.children).forEach((elem: any) => {
            if (elem.tagName === 'SMALL') {
                this.renderer.removeChild(parent, elem);
                this.renderer.appendChild(parent, errorSpan);
            }
        });
    }

    private hideError() {
        const parentElement = this.el.nativeElement?.parentNode;
        const errorSpan = this.findErrorElement(parentElement);
        if (errorSpan) {
            this.renderer.removeChild(parentElement, errorSpan);
        } else if (parentElement?.parentNode.classList.contains('p-inputgroup')) {
            let outerElement = parentElement?.parentNode?.parentNode;
            const errorSpan = this.findErrorElement(outerElement);
            if (errorSpan)
                this.renderer?.removeChild(outerElement, errorSpan);
        }else if (parentElement?.parentNode.tagName == 'P-FLOATLABEL') {
            const errorSpan = this.findErrorElement(parentElement?.parentNode);
            if (errorSpan)
                this.renderer?.removeChild(parentElement?.parentNode, errorSpan);
        }
    }

    private findErrorElement(parent: HTMLElement): HTMLElement | null {
        return parent.querySelector('.text-red-500');
    }

    private addRequiredIndicator() {
        if (this.control?.hasValidator(Validators.required)) {
            let parentElement = this.el.nativeElement?.parentNode;
            let label: HTMLElement | null = this.findLabel(parentElement);
            if (label && !this.isIndicatorPresent(label)) {
                const indicator = this.renderer.createElement('span');
                this.renderer.addClass(indicator, 'text-orange-500');
                const text = this.renderer.createText(' *');
                this.renderer.appendChild(indicator, text);
                this.renderer.appendChild(label, indicator);
            }
        }
    }

    private findLabel(parent: HTMLElement): HTMLElement | null {
        let label: HTMLElement | null = null;
        while (parent && !label) {
            label = parent.querySelector('label');
            parent = parent.parentElement!;
        }
        return label;
    }

    private isIndicatorPresent(label: HTMLElement): boolean {
        return Array.from(label.children).some(child => child.classList.contains('text-red-500'));
    }
}
