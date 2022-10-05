import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as DOMPurify from 'dompurify';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any): any {
     const sanitizedContent = DOMPurify.sanitize(value);
     return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);
  }

}
