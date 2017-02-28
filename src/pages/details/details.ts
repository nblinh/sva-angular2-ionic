import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Terrain } from '../../classes/Terrain';


@Component({
    selector: 'page-details',
    templateUrl: 'details.html'
})
export class DetailsPage {

    terrain : Terrain;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
	    this.terrain = navParams.get('terrain');
    }

    ionViewDidLoad() {
	    console.log('ionViewDidLoad DetailsPage');
    }

}
