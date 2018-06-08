export class Game{
  constructor(
    public id: number=0,
    public team1: number=null,
    public team2: number=null,
    public team1Name: String=null,
    public team2Name: String=null,
    public score1:number=null,
    public score2:number=null,
    public playOffGame: boolean = false
  ){

  }

  getWinner(){
    if(this.score1>this.score2){
      return {teamId:this.team1,teamName:this.team1Name};
    }else{
      return {teamId:this.team2,teamName:this.team2Name};
    }
  }
}
