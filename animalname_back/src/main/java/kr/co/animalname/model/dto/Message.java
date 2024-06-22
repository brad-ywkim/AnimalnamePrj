package kr.co.animalname.model.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value = "message")
public class Message {
	private int messageNo;
	private int nameNo;
	private String messageContent;
	private String messageDate;
	private int status;
}
