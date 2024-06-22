package kr.co.animalname.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.animalname.model.dto.AnimalRank;
import kr.co.animalname.model.dto.AnimalName;
import kr.co.animalname.model.dto.Compatibility;
import kr.co.animalname.model.dto.Luck;
import kr.co.animalname.model.dto.Message;
import kr.co.animalname.model.dto.Milestone;

@Mapper
public interface AnimalnameDao {
	List<AnimalRank> selectRealTimeRanking();
	int insertKeyword(String searchName);
	List<AnimalName> selectAnimalname(AnimalName an);
	int selectTotalCount(String searchName);
	AnimalName selectAnimalDetail(int nameNo);
	int selectTotalSearchNameCount(String name);	
	int selectTotalSearchCompatibilityCount(String name);
	List<Message> selectMessage(int nameNo);
	int insertMessage(Message m);
	int totalNameCount();
	int totalCompatibilityCount();
	int insertCompatibilityName(Compatibility c); //이름궁합 검색 2개 저장
	Compatibility selectCompatibilityResult(int compatibilityScore);
	Luck selectExistLuck(Luck luck);
	Luck selectLuckResult();
	int insertLuck(Luck newLuck);
}