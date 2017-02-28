import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ElasticSearchService  } from '../../services/esService';
import Globals = require('../../services/globals');
import { Terrain } from '../../classes/Terrain';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ElasticSearchService ]
})
export class HomePage {
  terrains:Terrain[];
  selectedTerrain : Terrain;
  searchText: string="";

  constructor(public navCtrl: NavController, private esService: ElasticSearchService) {
    this.search();
    this.sendRequest();
  }
  
  search() : void {
    this.esService.search(this.searchText)
      .then((searchResult) => {
        let results: Array<any> = ((searchResult.hits || {}).hits || [])
          .map((hit) => hit._source);
            if (results.length > 0) {
              this.terrains = results;
              Globals.terrains=this.terrains;
            }
        });
  }
  detail(terrain : Terrain) : void{
    this.selectedTerrain = terrain;
    if (!this.selectedTerrain) return;
    this.navCtrl.push(DetailsPage, { 'terrain' : this.selectedTerrain });
  }
  
  private sendRequest() {
  }

}
