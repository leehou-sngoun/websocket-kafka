package com.kshrd.websocket_notification_kafka.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class KafkaConsumerService {

    private final KafkaTemplate<String, String> kafkaTemplate;

    private final SimpMessagingTemplate template;

    public KafkaConsumerService(KafkaTemplate<String, String> kafkaTemplate, SimpMessagingTemplate template) {
        this.kafkaTemplate = kafkaTemplate;
        this.template = template;
    }

    public void sendMessage(String msg) {
        kafkaTemplate.send("topic-name", msg);
    }

    void sendMessageWithCallback(String message) {
        CompletableFuture<SendResult<String, String>> future = kafkaTemplate.send("topicName", message);
        future.whenComplete((result, ex) -> {
            if (ex == null) {
                System.out.println("Sent message=[" + message +
                        "] with offset=[" + result.getRecordMetadata().offset() + "]");
            } else {
                System.out.println("Unable to send message=[" +
                        message + "] due to : " + ex.getMessage());
            }
        });

    }

}
