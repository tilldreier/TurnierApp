import {Participant} from "./Participant";
import {Game} from "./Game";
import {TournamentRules} from "./TournamentRules";
import {Ranking} from "./Ranking";
import {Notification} from "./Notification";
import {PlayoffRound} from "./PlayoffRound";

export class Tournament {
  static MAX_DATE: number = 253402210800000;

  static STATUS_NEW: string = "Neu";
  static STATUS_ONGOING: string = "Im Gang";
  static STATUS_PLAYOFFS: string = "Finalspiele";
  static STATUS_FINISHED: string = "Beendet";

  constructor(public key: string = null,
              public name: string = "",
              public createdOn: number = Date.now(),
              public createdOnInverse: number = 0,
              public participants: Array<Participant> = [],
              public games: Array<Game> = [],
              public rules: TournamentRules = new TournamentRules(),
              public notifications: Array<Notification> = [],
              public status: string = Tournament.STATUS_NEW,
              public playoffRounds: Array<PlayoffRound> = []) {
    this.createdOnInverse = Tournament.MAX_DATE - this.createdOn;
  }

  static fromJsonList(array): Tournament[] {
    return array.map(json => Tournament.fromJson(json))
  }

  static fromJson({key, name, createdOn, createdOnInverse, participants, games, rules, notifications,status}): Tournament {
    return new Tournament(
      key,
      name,
      createdOn,
      createdOnInverse,
      participants,
      games,
      rules,
      notifications,
      status
    );
  }

  generateGamePlan() {
    let numberOfParticipants = this.participants.length;
    let totalGames = numberOfParticipants * (numberOfParticipants - 1) / 2;
    let rounds: Array<number> = new Array(numberOfParticipants);

    for (let j = 0; j < numberOfParticipants; j++) {
      rounds[j] = 0;
    }

    for (let i = 0; i < totalGames; i++) {
      let game = new Game();
      let valid: boolean;

      do {
        valid = true;

        let min = Math.min(...rounds);
        do {
          game.team1 = this.randomParticipantIndex();
        } while (rounds[game.team1] >= min + 1)

        do {
          game.team2 = this.randomParticipantIndex();
        } while (game.team1 == game.team2 || ( rounds[game.team2] >= min + 1
        && !(numberOfParticipants % 2 == 0 || (i * 2) % numberOfParticipants == numberOfParticipants - 1)))

        if (valid) {
          this.games.forEach((item) => {
            if (( game.team1 == item.team1 || game.team1 == item.team2 ) &&
              (game.team2 == item.team1 || game.team2 == item.team2)) {
              valid = false;
            }
          });
        }

        let numberOfTeamsLeft:number = 0;
        let team1:number=null;
        let team2:number=null;
        for (let j = 0; j < numberOfParticipants; j++) {
          if(rounds[j] == min){
            numberOfTeamsLeft++
            if(team1===null){
              team1=j;
            }else{
              team2=j;
            }
          }
        }
        if(numberOfTeamsLeft === 2){
          this.games.forEach((item) => {
            if (( team1 == item.team1 || team1 == item.team2 ) &&
              (team2 == item.team1 || team2 == item.team2)) {
              valid = false;
            }
          });
        }

      } while (!valid)

      this.games.push(game);
      rounds[game.team1]++;
      rounds[game.team2]++;
    }

    if(this.rules.playoffs) {
      let i: number = 0;
      do {
        let playOffRound = new PlayoffRound();

        playOffRound.setRound(i, this.rules.teamsInPlayoffs);

        this.playoffRounds.push(playOffRound);
        i++;
      } while (i < this.rules.teamsInPlayoffs / 2)
    }
  }

  randomParticipantIndex() {
    return Math.floor(Math.random() * this.participants.length);
  }

  getNextGames():Array<Game>{
    let nextGames: Array<Game> = [];
    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      if (game.score1 == null && game.score2 == null) {
        this.setGameTeamName(game);
        nextGames.push(game);
      }
      if (nextGames.length == 3) {
        return nextGames;
      }
    }
    return nextGames;
  }

  getResults():Array<Game>{
    let results: Array<Game> = [];
    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      if (game.score1 != null && game.score2 != null) {
        this.setGameTeamName(game);
        results.push(game);
      }
    }
    return results;
  }

  getFixture():Array<Game>{
    let fixture: Array<Game> = [];
    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      if (game.score1 == null && game.score2 == null) {
        this.setGameTeamName(game);
        game.id=i;
        fixture.push(game);
      }
    }
    return fixture;
  }

  getRanking(){
    let ranking: Array<Ranking> = [];
    for (let i = 0; i < this.participants.length; i++) {
      ranking.push(new Ranking(i, this.participants[i].name));
    }

    this.rules.win = Number(this.rules.win);
    this.rules.draw = Number(this.rules.draw);
    this.rules.lose = Number(this.rules.lose);

    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      if (game.score1 != null && game.score2 != null) {
        game.score1=Number(game.score1);
        game.score2=Number(game.score2);
        ranking[game.team1].pointsFor+=game.score1;
        ranking[game.team1].pointsAgainst+=game.score2;
        ranking[game.team2].pointsFor+=game.score2;
        ranking[game.team2].pointsAgainst+=game.score1;

        // Team1 Wins
        if(game.score1 > game.score2){
          ranking[game.team1].wins++;
          ranking[game.team1].points+=this.rules.win;

          ranking[game.team2].losses++;
          ranking[game.team2].points+=this.rules.lose;

        // Team2 Wins
        }else if(game.score2 > game.score1){
          ranking[game.team2].wins++;
          ranking[game.team2].points+=this.rules.win;

          ranking[game.team1].losses++;
          ranking[game.team1].points+=this.rules.lose;

        // Draw
        }else{
          ranking[game.team1].draws++;
          ranking[game.team1].points+=this.rules.draw;

          ranking[game.team2].draws++;
          ranking[game.team2].points+=this.rules.draw;
        }
      }
    }

    ranking.sort(function(a, b){
      if(b.points != a.points){
        return b.points-a.points;
      }else{
        return (b.pointsFor-b.pointsAgainst)-(a.pointsFor-a.pointsAgainst);
      }

    });
    return ranking;
  }

  setGameTeamName(game){
    game.team1Name = this.participants[game.team1].name;
    game.team2Name = this.participants[game.team2].name;
  }

  removeParticipant(i:number){
    this.participants.splice(i, 1);
  }

  addNotification(notification: Notification){
    this.notifications.unshift(notification);
  }

  numberOfPlayoffTeams(){
    let i=2;
    let numberOfTeams: Array<number> = [];
    do{
      numberOfTeams.push(i);
      i = i * 2;
    }while (i<=this.participants.length && i<16);
    return numberOfTeams;
  }

  updatePlayoffs(){
    //let status = this.getStatus();
    if(this.rules.playoffs){
      for(let i:number=0; i<this.playoffRounds;i++){
        let playOffRound = this.playoffRounds[i];

        if(playOffRound.status == PlayoffRound.STATUS_PROV){
          // First Round generate from rangking
          if(i === 0){
            let rangking=this.getRanking();
            let j:number = 0;
            do{
              let game = new Game();
              game.playOffGame = true;
              game.team1 = rangking[i].teamId;
              game.team1Name = rangking[i].teamName;
              game.team2 = rangking[this.rules.teamsInPlayoffs-1-i].teamId;
              game.team2Name = rangking[this.rules.teamsInPlayoffs-1-i].teamName;

              playOffRound.games.push(game);

              j++;
            }while (j<this.rules.teamsInPlayoffs / 2)

            if(this.status == Tournament.STATUS_PLAYOFFS){
              playOffRound.status = PlayoffRound.STATUS_FIX;
            }
          }else{
            let prevRound=this.playoffRounds[i-1];
            if(prevRound.status !== PlayoffRound.STATUS_END){
              let j:number = 0;
              do{
                let game = new Game();
                game.playOffGame = true;

                let winner1 = prevRound.games[j].getWinner();
                game.team1 = winner1.teamId;
                game.team1Name = winner1.teamName;

                let winner2 = prevRound.games[prevRound.games.length-1-j].getWinner();
                game.team2 = winner2.teamId;
                game.team2Name = winner2.teamName;

                playOffRound.games.push(game);
                j++;
              }while(j < prevRound.games.length / 2)

              playOffRound.status = PlayoffRound.STATUS_FIX;
            }
          }
        }
      }

    }
  }

  updateStatus(){
    let newStatus = this.checkStatus();
    if(this.status !== newStatus){
      this.status = newStatus;
      return true;
    }else{
      return false;
    }
  }

  checkStatus(){
    let started:boolean = false;
    let allGamesPlayed:boolean = true;
    let allPlayoffsPlayed:boolean = false;

    for(let i = 0; i < this.games.length; i++){
      if(this.games[i].score1 !== null && this.games[i].score2 !== null){
        started = true;
      }else{
        allGamesPlayed = false;
      }
    }

    if(this.rules.playoffs === false || (this.playoffRounds[this.playoffRounds.length-1].games[0].score1 !== null &&
      this.playoffRounds[this.playoffRounds.length-1].games[0].score2 !== null)){
      allPlayoffsPlayed = true;
    }

    if(started && allGamesPlayed && allPlayoffsPlayed){
      return Tournament.STATUS_FINISHED;
    }else if(started === true && allGamesPlayed === true){
      return Tournament.STATUS_PLAYOFFS;
    }else if(started === true){
      return Tournament.STATUS_ONGOING;
    }else{
      return Tournament.STATUS_NEW;
    }
  }

}
