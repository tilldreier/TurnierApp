export class Game{
  id: number;

  team1: number;
  team2: number;

  team1Name: String;
  team2Name: String;

  score1: number;
  score2: number;

  playOffGame: boolean = false;

  getWinner(){
    if(this.score1>this.score2){
      return {teamId:this.team1,teamName:this.team1Name};
    }else{
      return {teamId:this.team2,teamName:this.team2Name};
    }
  }
}
