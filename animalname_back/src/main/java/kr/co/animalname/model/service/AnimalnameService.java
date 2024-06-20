package kr.co.animalname.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.animalname.model.dao.AnimalnameDao;
import kr.co.animalname.model.dto.Animalname;
import kr.co.util.HangulDecomposer;
import kr.co.util.PageInfo;
import kr.co.util.Pagination;

@Service
public class AnimalnameService {

	@Autowired
	private AnimalnameDao animalnameDao;

	@Autowired
	private Pagination pagination;

	public Map selectAnimalname(int reqPage, String searchName) {
		int numPerPage = 50; // 한 페이지당 게시물 수
		int pageNaviSize = 5;
		int totalCount = animalnameDao.selectTotalCount(searchName);
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		Animalname an = new Animalname();
		an.setPi(pi);
		an.setSearchName(searchName);
		List<Animalname> name = animalnameDao.selectAnimalname(an);
		HashMap<String, Object> map = new HashMap<>();
		map.put("nameList", name);
		map.put("pi", pi);
		return map;
	}
	
	
	
    private static final Map<Character, Integer> strokeMap = new HashMap<>();
    static {
        // 자음 획수
        strokeMap.put('ㄱ', 2);
        strokeMap.put('ㄲ', 4);
        strokeMap.put('ㄴ', 2);
        strokeMap.put('ㄷ', 3);
        strokeMap.put('ㄸ', 6);
        strokeMap.put('ㄹ', 5);
        strokeMap.put('ㅁ', 4);
        strokeMap.put('ㅂ', 4);
        strokeMap.put('ㅃ', 8);
        strokeMap.put('ㅅ', 2);
        strokeMap.put('ㅆ', 4);
        strokeMap.put('ㅇ', 1);
        strokeMap.put('ㅈ', 3);
        strokeMap.put('ㅉ', 6);
        strokeMap.put('ㅊ', 4);
        strokeMap.put('ㅋ', 3);
        strokeMap.put('ㅌ', 4);
        strokeMap.put('ㅍ', 4);
        strokeMap.put('ㅎ', 3);

        // 모음 획수
        strokeMap.put('ㅏ', 2);
        strokeMap.put('ㅐ', 3);
        strokeMap.put('ㅑ', 3);
        strokeMap.put('ㅒ', 4);
        strokeMap.put('ㅓ', 2);
        strokeMap.put('ㅔ', 3);
        strokeMap.put('ㅕ', 3);
        strokeMap.put('ㅖ', 4);
        strokeMap.put('ㅗ', 2);
        strokeMap.put('ㅘ', 4);
        strokeMap.put('ㅙ', 5);
        strokeMap.put('ㅚ', 3);
        strokeMap.put('ㅛ', 3);
        strokeMap.put('ㅜ', 2);
        strokeMap.put('ㅝ', 4);
        strokeMap.put('ㅞ', 5);
        strokeMap.put('ㅟ', 3);
        strokeMap.put('ㅠ', 3);
        strokeMap.put('ㅡ', 1);
        strokeMap.put('ㅢ', 2);
        strokeMap.put('ㅣ', 1);
    }

    private HangulDecomposer hangulDecomposer;
    
    public int calculateStrokes(String name) {
        int totalStrokes = 0;
        for (char c : name.toCharArray()) {
            String decomposed = hangulDecomposer.decompose(c);
            for (char decomposedChar : decomposed.toCharArray()) {
                Integer strokes = strokeMap.get(decomposedChar);
                if (strokes != null) {
                    totalStrokes += strokes;
                } else {
                    throw new IllegalArgumentException("Unsupported character: " + decomposedChar);
                }
            }
        }
        return totalStrokes;
    }
    
	public Animalname selectCompatibilityResult(int compatibilityScore) {
		Animalname result = animalnameDao.selectCompatibilityResult(compatibilityScore);
		result.setCompatibilityScore(compatibilityScore);
		System.out.println("결과:" + result);
		return result;
	}

	@Transactional
	public int insertSearchName(String name1, String name2) {
		Animalname an = new Animalname();
		an.setName1(name1);
		an.setName2(name2);
		System.out.println("검색결과저장 : " + an);
		int search = animalnameDao.insertSearchName(an);
		System.out.println("뭐야 설치:" + search);
		return search;
	}
	
	
	
	
}
