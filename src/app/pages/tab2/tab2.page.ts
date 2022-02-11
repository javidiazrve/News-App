import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, PopoverController, IonContent } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { PopoverplComponent } from 'src/app/components/popoverpl/popoverpl.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonContent,{static: true}) content: IonContent;
  @ViewChild(IonSegment,{static: true}) segment: IonSegment;

  paisNoticia = 'us';
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor( private ns: NoticiasService,
               private popoverController: PopoverController ) {}

  ngOnInit(){
    this.segment.value = this.categorias[0];
    this.cargarNoticias( this.categorias[0]);
  }

  loadData( event ){
    this.cargarNoticias( this.segment.value, event);
  }

  selectCategoria( event ){
    
    this.noticias = [];

    this.cargarNoticias(event.detail.value);
  }

  async mostrarLista( ev ) {
    const popover = await this.popoverController.create({
      component: PopoverplComponent,
      event: ev
    });
    await popover.present();

    this.paisNoticia = (await popover.onWillDismiss()).data;
    
    this.noticias = [];

    this.cargarNoticias(this.segment.value)
    this.content.scrollToTop();

  }

  cargarNoticias( categoria: string, event? ){



    this.ns.getTopHeadLinesCategoria(categoria,this.paisNoticia).subscribe(resp => {

              console.log(resp);
              
              if(resp.articles.length === 0){
                event.target.disabled = true;
                event.target.complete();
                return;
              }

              this.noticias.push(...resp.articles);

              if( event ){
                event.target.complete();
              }
            });
  }

}
