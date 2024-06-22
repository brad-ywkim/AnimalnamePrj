package kr.co.animalname.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="compatibility")
public class Compatibility {

	private int compatibilityNo;
	private String compatibilityResult;
	
	private String name1;
	private String name2;
	private int compatibilityScore;
	
	
}
