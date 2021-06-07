import { DrawResultState } from './participants.enum';
export interface RegisterParticipant {
    firstName: string;
    lastName: string;
    emailAddress: string;
    productSerialNumber: string;
    hasOlderThan18:boolean;

  }
  export interface Participant {
    participantId:number,
    firstName: string;
    lastName: string;
    emailAddress: string;
    productSerialNumber: string;
    drawId:number,
    DrawResultState:DrawResultState,
    DrawResultStateString:string
  }