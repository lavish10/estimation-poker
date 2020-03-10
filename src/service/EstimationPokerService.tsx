import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default class EstimationPokerService {

    public static instance: EstimationPokerService;
    public static stompClient: Stomp;

    private constructor() {
    }

    public static getInstance(): EstimationPokerService {
        if (!EstimationPokerService.instance) {
            EstimationPokerService.instance = new EstimationPokerService();
        }

        return EstimationPokerService.instance;
    }
    public getStompClient() {
          if(!EstimationPokerService.stompClient){
              EstimationPokerService.stompClient =Stomp.over(new SockJS("http://localhost:8080/gs-guide-websocket"));
          }

          return EstimationPokerService.stompClient;
    }

}