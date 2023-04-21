package com.kshrd.websocket_notification_kafka.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaListenerHandler {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public KafkaListenerHandler(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @KafkaListener(topics="${kafka.topic}")
    public void consume(@Payload String message) {
        System.out.println("Received Message in group foo: " + message);
        simpMessagingTemplate.convertAndSend("/notify/123", message);

    }

}
