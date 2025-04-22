import nats from "node-nats-streaming"
import { TicketCreatedPublisher } from "@ticketing2431/common/build/events/ticket-created-publisher"
const stan=nats.connect("ticketing","abc",{
    url:"nats://localhost:4222"
})

stan.on("connect",async()=>{
    console.log("Publisher connected to nats")
    const publisher=new TicketCreatedPublisher(stan);
    try{
        publisher.Publish({
            id:'123',
            title:"concert",
            price:20,
        });
    }
    catch(err){
        console.log(err);
    }

    /**
     * const data=JSON.stringify({
        id:"123",
        title:"concert",
        price:20
    });
    stan.publish("ticket:created",data,()=>{
        console.log("event published")
    })
     */
})