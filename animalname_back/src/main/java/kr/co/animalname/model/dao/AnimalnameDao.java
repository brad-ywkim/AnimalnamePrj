package kr.co.animalname.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.animalname.model.dto.Animalname;

@Mapper
public interface AnimalnameDao {

	List<Animalname> selectAnimalname(Animalname an);
	int selectTotalCount(String searchName);
	Animalname selectCompatibilityResult(int compatibilityScore);
	int insertSearchName(Animalname an);

}
