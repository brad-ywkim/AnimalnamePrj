package kr.co.animalname.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="milestone")
public class Milestone {
	private int operatingPeriod;
	private int totalSearchNameCount;
	private int totalSearchCompatibilityCount;
	private String searchDate;
}
