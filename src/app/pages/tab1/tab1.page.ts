import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { RespuestaTopHeadLines, Article } from '../../interfaces/interfaces';
import { PopoverController } from '@ionic/angular';
import { PopoverplComponent } from '../../components/popoverpl/popoverpl.component';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  @ViewChild(IonContent,{static: true}) content: IonContent;
  paisNoticia = 'us';

  noticias: Article[] = [];

  constructor( private ns: NoticiasService,
               private popoverController: PopoverController ) {}

  ngOnInit(){
    this.cargarNoticias();
  }

  async mostrarLista( ev ) {
    const popover = await this.popoverController.create({
      component: PopoverplComponent,
      event: ev
    });
    await popover.present();

    this.paisNoticia = (await popover.onWillDismiss()).data;
    
    this.noticias = [];

    this.cargarNoticias();
    this.content.scrollToTop();

  }

  loadData( event ){
    console.log(event);
    
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){

    this.ns.getTopHeadLines(this.paisNoticia)
    .subscribe( resp => {
      console.log('noticias', resp);

      if(resp.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      
      this.noticias.push( ...resp.articles );
    });

    if(event){
      event.target.complete();
    }
  }

}
