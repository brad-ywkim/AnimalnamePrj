package kr.co.animalname.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="luck")
public class Luck {
	private int luckNo;
	private String luck;
	private String luckTitle;
	
	private String name1;
	private String name2;
	private String searchDate;
	
}
