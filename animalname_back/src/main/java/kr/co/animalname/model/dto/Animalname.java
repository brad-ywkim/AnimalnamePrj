package kr.co.animalname.model.dto;

import org.apache.ibatis.type.Alias;

import kr.co.util.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="animalname")
public class Animalname {
	private int nameNo;
	private String name;
	private int nameCount;
	private PageInfo pi;
	private String searchName;
	private int compatibilityScore;
	private String compatibilityResult;
	private String name1;
	private String name2;
}
