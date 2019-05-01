import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content: string, type: number) {
    if (type == 0) {
      content = content + (content.indexOf('?') < 0 ? '?rel=0' : '&rel=0');
      return this.sanitizer.bypassSecurityTrustResourceUrl(content);
    } else if (type == 1) {
      return this.sanitizer.bypassSecurityTrustHtml(content);
    }
    return this.sanitizer.bypassSecurityTrustStyle(content);
  }
}
