import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { PopoverplComponent } from './popoverpl/popoverpl.component';



@NgModule({
  declarations: [
    NoticiasComponent,
    NoticiaComponent,
    PopoverplComponent
  ],
  exports:[
    NoticiasComponent,
    PopoverplComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
