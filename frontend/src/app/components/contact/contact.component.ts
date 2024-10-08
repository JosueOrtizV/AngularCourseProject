import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, AfterViewInit{
  public widthSlider: number;
  public anchuraToSlider: number;
  public captions:boolean;
  public autor: any;
  
  @ViewChild('textos') textos!: ElementRef;

  constructor(){
    this.widthSlider = 0;
    this.anchuraToSlider = 0;
    this.captions = true;
  }

  ngOnInit(): void {
    var opcion_clasica = document.querySelector('#texto')?.innerHTML;
    // console.log(opcion_clasica);
    
  }

  ngAfterViewInit(): void {
    console.log(this.textos);
  }

  cargarSlider(){
    this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider(){
    this.anchuraToSlider = 0;
    this.widthSlider = 0
  }

  conseguirAutor(event:any){
    this.autor = event;
  }

}
