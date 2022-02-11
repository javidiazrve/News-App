import { Component, OnInit, Input} from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';
import { stringify } from 'querystring';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() favoritos: boolean;
  @Input() noticia: Article;
  @Input() i: number;

  constructor( private inAppBrowser: InAppBrowser, 
               private actionSheetCtrl: ActionSheetController,
               private socialSharing: SocialSharing,
               private dls: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia(){
    
    const browser = this.inAppBrowser.create(this.noticia.url, '_system');
  }

  async mostrarOpciones(){

      let Fav = {};

      if (this.favoritos) {
        Fav = {
          text: 'Quitar de Favoritos',
          icon: 'trash',
          cssClass: 'action-dark',
          handler: () => {
              this.dls.borrarFavorito( this.noticia );
              this.dls.cargarFavoritos();
          }
        }
      }else{
        Fav = {
          text: 'Agregar a Favoritos',
          icon: 'star',
          cssClass: 'action-dark',
          handler: () => {
            this.dls.guardarNoticia( this.noticia );
          }
        }
      }

      const actionSheet = await this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Compartir',
            icon: 'share',
            cssClass: 'action-dark',
            handler: () => {
              this.socialSharing.share(
                this.noticia.title,
                this.noticia.source.name,
                '',
                this.noticia.url
              );
            }
          },
          Fav,
          {
            text: 'Cancel',
            icon: 'close',
            cssClass: 'action-dark',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      await actionSheet.present();
  }
}
