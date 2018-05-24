export class Ranking{
  pointsFor:number=0;
  pointsAgainst:number=0;
  wins:number=0;
  losses:number=0;
  draws:number=0;
  points:number=0;

  constructor(public teamId:number, public teamName:String){

  }
}
