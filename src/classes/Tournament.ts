import {Participant} from "./Participant";
import {Game} from "./Game";
export class Tournament{
  name: String;
  participants: Array<Participant>=[];
  games: Array<Game>=[];
}
