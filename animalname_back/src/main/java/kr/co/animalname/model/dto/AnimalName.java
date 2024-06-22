package kr.co.animalname.model.dto;

import org.apache.ibatis.type.Alias;

import kr.co.util.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Alias(value="animalName")
public class AnimalName {
    private static final long serialVersionUID = 1L;

    private int nameNo;
	private String name;
	private int nameCount;
	private String nameImage;
		
	private PageInfo pi;
	private String searchName;
	private String name1;
	private String name2;
	private int totalSearchNameCount;
	private int totalSearchCompatibilityCount;

}
