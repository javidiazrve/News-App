import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popoverpl',
  templateUrl: './popoverpl.component.html',
  styleUrls: ['./popoverpl.component.scss'],
})
export class PopoverplComponent implements OnInit {

  @Output() pais = new EventEmitter<string>();

  // tslint:disable-next-line: max-line-length
  listaPaises = ['us', 'de', 'sa', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 
                 'cn', 'co', 'kr', 'cu', 'eg', 'ae', 'sk', 'si', 'ph', 'fr', 'gr', 'hk', 
                 'hu', 'in', 'id', 'ie', 'il', 'it', 'jp', 'lv', 'lt', 
                 'my', 'ma', 'mx', 'ng', 'no', 'nz', 'nl', 'pl', 'pt', 
                 'gb', 'cz', 'ro', 'ru', 'rs', 'sg', 'za', 'se', 'th', 'tw', 'tr', 'ua', 've'];

  nombrePaises = [
                  'Estados Unidos','Alemania','Arabia Saudita','Argentina','Austria','Australia','Belgica','Bulgaria',
                  'Brazil','Canada','Chile','China','Colombia','Corea del Sur','Cuba','Egipto','Emiratos Arabes Unidos',
                  'Eslovaquia','Eslovenia','Filipinas','Francia','Grecia','Honk Kong','Hungria','India','Indonesia',
                  'Irlanda','Israel','Italia','Japon','Letonia','Lituania','Malasia','Marruecos','Mexico','Nigeria',
                  'Noruega','Nueva Zelanda','Paises Bajos','Polonia','Portugal','Reino Unido','Republica Checa','Rumania',
                  'Rusia','Serbia','Singapur','Sudafrica','Suecia','Tailandia','Taiwan','Turquia','Ucrania','Venezuela'
                ]
  constructor( private popctlr: PopoverController) { }

  ngOnInit() {}

  seleccionarPais(item){
    this.popctlr.dismiss(item);
  }

}
