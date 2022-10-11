import { Directive, Type, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[lazyComponent]'
})
export class LazyDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

export class DynamicTemplateComponentItem {
  constructor(public component: Type<any>, public data: any) {
  }
}
