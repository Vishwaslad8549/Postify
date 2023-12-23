import { Component, ContentChild, Directive, TemplateRef } from '@angular/core';
@Directive({
  selector:'[appfooter]'
})
export class FooterDirective{
  constructor(public templateRef:TemplateRef<any>){

  }
}
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
// @ContentChild(FooterDirective) footer!:FooterDirective;
}
