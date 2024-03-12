import { AfterViewInit, Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appShorten]'
})
export class ShortenDirective implements AfterViewInit {
  @Input() maxLength: number = 100; 

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
      const text = this.el.nativeElement.textContent; 
      if (text.length > this.maxLength) {
        const shortenedText = text.substring(0, this.maxLength) + '...'; 
        this.renderer.setProperty(this.el.nativeElement, "textContent", shortenedText);
      }
  }
}
