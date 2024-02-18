import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MathJaxService } from 'src/app/services/math-jax.service';

@Component({
  selector: 'app-math-jax-paragraph',
  standalone: true,
  imports: [],
  templateUrl: './math-jax-paragraph.component.html',
  styleUrls: ['./math-jax-paragraph.component.scss']
})
export class MathJaxParagraphComponent {
  @ViewChild('mathParagraph') paragraphElement: any;
  @Input({ required: true }) mathString!: string;

  constructor(private mathJaxService: MathJaxService) {}

  ngOnInit() {
    this.mathJaxService.getMathJaxLoadedPromise().then(() => {
      console.log('MathJax loaded, rendering math');
      
      // Insert the input string
      this.paragraphElement.nativeElement.innerHTML = this.mathString;
      
      // Render the Latex
      this.mathJaxService.render(this.paragraphElement.nativeElement);
    });
  }
}