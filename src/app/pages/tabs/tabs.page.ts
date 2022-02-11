import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  tab3Selected: boolean;

  constructor() {}

  onClick(tab){
    if( tab === 3){
      this.tab3Selected = true;
    }else{
      this.tab3Selected = false;
    }
  }
}
