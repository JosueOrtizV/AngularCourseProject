import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { event } from 'jquery';
declare var $: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit{

  @Input() anchura: number;
  @Input('etiquetas') captions: boolean;
  @Output() getAutor = new EventEmitter();

  public autor: any

  constructor(){
    this.anchura= 0;
    this.captions = false;
    this.autor = {
      nombre: "Josue",
      website: "elestofado.com",
      youtube: "elestofadodp"
    }
  }

  ngOnInit(): void {
      
      $("#logo").click(function (e:any) {
        e.preventDefault();
        $("header").css("background", "green")
                    .css("height", "50px");
      });

      $('.galeria').bxSlider({
        mode: 'fade',
        captions: this.captions,
        slideWidth: this.anchura
      });
  }

  lanzar(){
    this.getAutor.emit(this.autor);
  }
}
