import {inject} from 'aurelia-framework';
import {DreamFactoryApi} from '../services/dreamfactory-api'
import {DreamFactoryAdapter} from '../services/syncfusionDreamFactoryAdapter';
import {Utils} from '../services/utils';
import  dreamfactoryconfig from '../services/dreamfactoryconfig'

@inject(DreamFactoryApi)
export class GridRemote {
  constructor(dfapi) {
    this.dfapi = dfapi;

  }

  attached() {
    this.dfapi.login().then(response => {
      if (response.session_id) {
        //We are logged in
        console.log(response)
        this.getdata()
      }
    })
  }

  //Use custom adapter to retrieve data from api and bind to syncfusion grid
  //The problem is I am not able to import and use the custom adapter like I use it in ES5

  getdata() {
    let token = Utils.getToken(dreamfactoryconfig.tokenKey);

    let datamanager = ej.DataManager({
      url: "https://api.ageektech.com/api/v2/northwind/_table/customers",
      adaptor: new DreamFactoryAdapter.syncfusionDreamFactoryAdapter,
      headers: [{"X-DreamFactory-API-Key": dreamfactoryconfig.APP_API_KEY, "X-DreamFactory-Session-Token": token}]
    })

    $("#Grid").ejGrid({
      dataSource: datamanager,
      allowPaging: true,
      allowSorting: true,
      isResponsive: true,
      columns: [
        {field: "first_name", headerText: "First Name", width: 110},
        {field: "last_name", headerText: "Last Name", width: 110}
      ]
    });
  }
}

