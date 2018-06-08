import {Game} from "./Game";
/**
 * Created by tilldreier on 08.06.18.
 */
export class PlayoffRound{
  static ROUNDS:Array<string> = ["Final","Halbfinals","Viertelfinals","Achtelfinals"];
  static STATUS_PROV:string="Provisorisch";
  static STATUS_FIX:string="Fixiert";
  static STATUS_END:string="Beendet";

  public round:number;
  public roundName:string;
  public games:Array<Game>=[];
  public status:string=PlayoffRound.STATUS_PROV;

  setRound(round:number, teamsInPlayoffs:number){
    this.round = 0;
    this.roundName = PlayoffRound.ROUNDS[(teamsInPlayoffs/2)-1-round];
  }
}
