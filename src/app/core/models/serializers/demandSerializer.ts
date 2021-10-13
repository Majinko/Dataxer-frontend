import {Demand} from '../demand';


export class DemandSerializer{
  fromJson(json: any): Demand {
    return json as Demand;
  }

  toJson(demand: Demand): Demand {
    return demand;
  }
}
