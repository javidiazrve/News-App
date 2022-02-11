import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor( private storage: Storage,
               private toast: ToastController ) { 

    this.cargarFavoritos();

  }

  async presentToast( message: string ){
    const toast = await this.toast.create({
      message,
      duration: 1000
    });
    toast.present();
  }

  guardarNoticia( noticia: Article){

    const existe = this.noticias.find( noti => noti.title === noticia.title)

    if(!existe){
      this.noticias.unshift( noticia );
      this.storage.set('favoritos', this.noticias);
    }

    this.presentToast( 'Agregado a Favoritos' );
  }

  async cargarFavoritos(){

    const favoritos = await this.storage.get('favoritos');

    waits(1000);
    
    if(favoritos){
      console.log(favoritos, ' ja que lo que');
      this.noticias = favoritos;
      console.log(this.noticias, 'despues');
    }
  }

  borrarFavorito( noticia: Article){

    this.noticias = this.noticias.filter(not => not.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);

    console.log(this.noticias);
    
    this.presentToast( 'Borrado de Favoritos' );

  }
}
