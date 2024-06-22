package kr.co.animalname.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="animalRank")
public class AnimalRank {
	private String keyword;
	private int searchCount;
		
}
