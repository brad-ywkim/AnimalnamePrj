package kr.co.animalname.model.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import kr.co.animalname.model.dao.AnimalnameDao;
import kr.co.animalname.model.dto.AnimalRank;
import kr.co.animalname.model.dto.AnimalName;
import kr.co.animalname.model.dto.Compatibility;
import kr.co.animalname.model.dto.Luck;
import kr.co.animalname.model.dto.Message;
import kr.co.animalname.model.dto.Milestone;
import kr.co.util.HangulDecomposer;
import kr.co.util.PageInfo;
import kr.co.util.Pagination;

@Service
public class AnimalnameService {

	@Autowired
	private AnimalnameDao animalnameDao;

	@Autowired
	private Pagination pagination;

	@Autowired
	private RedisTemplate<String, Object> redisTemplate;

	@Autowired
	private RealTimeNameRankHandler realTimeNameRankHandler;

	@Transactional
	public int insertKeyword(String searchName) {
		int result = animalnameDao.insertKeyword(searchName);
		if (result > 0) {
			// 키워드 삽입 성공 시, 실시간 순위 업데이트 전송
			Map<String, Object> rankingData = getRealTimeNameRanking();
			realTimeNameRankHandler.sendRealTimeNameRank(rankingData);
		}
		return result;
	}

	public Map<String, Object> getRealTimeNameRanking() {
		// 실시간 이름 순위를 계산하여 반환하는 로직을 추가합니다.
		List<AnimalRank> rankingList = animalnameDao.selectRealTimeRanking();
		Map<String, Object> rankingData = new HashMap<>();
		rankingData.put("rankingList", rankingList);
		return rankingData;
	}

	@Cacheable(value = "animalnames", key = "#searchName + '_' + #reqPage")
	public Map<String, Object> selectAnimalname(int reqPage, String searchName) {
		System.out.println("여기들ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ와?");

		int numPerPage = 40; // 한 페이지당 게시물 수
		int pageNaviSize = 5;
		int totalCount = animalnameDao.selectTotalCount(searchName);
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		AnimalName a = new AnimalName();
		a.setPi(pi);
		a.setSearchName(searchName);
		List<AnimalName> name = animalnameDao.selectAnimalname(a);
		HashMap<String, Object> map = new HashMap<>();
		map.put("nameList", name);
		map.put("pi", pi);
		return map;
	}

	public AnimalName selectAnimalDetail(int nameNo) {
		// 순위, 동물 수, 이미지, , 이름,
		AnimalName a = animalnameDao.selectAnimalDetail(nameNo);

		// 누적검색수 가져오기
		a.setTotalSearchNameCount(animalnameDao.selectTotalSearchNameCount(a.getName()));

		// 누적 궁합수 가져오기
		a.setTotalSearchCompatibilityCount(animalnameDao.selectTotalSearchCompatibilityCount(a.getName()));
		return a;
	}

	public List<Message> selectMessage(int nameNo) {
		List<Message> m = animalnameDao.selectMessage(nameNo);
		return m;
	}

	@Transactional
	public int insertMessage(Message m) {
		int result = animalnameDao.insertMessage(m);
		return result;
	}

	// 메인 마일스톤
	public Milestone selectMilestone() {
		Milestone milestone = new Milestone();
		LocalDate currentDate = LocalDate.now();
		LocalDate startDate = LocalDate.of(2024, 6, 1);

		// 두 날짜 일수 계산
		int operatingDays = (int) ChronoUnit.DAYS.between(currentDate, startDate);
		milestone.setOperatingPeriod((operatingDays * -1) + 1);

		// 누적 검색 수 가져오기
		milestone.setTotalSearchNameCount(animalnameDao.totalNameCount());
		milestone.setTotalSearchCompatibilityCount(animalnameDao.totalCompatibilityCount());

		return milestone;
	}

	// 획수 계산
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
			String decomposed = hangulDecomposer.decompose(c); // 결과 : ㄱ ㅏ ㅇ
			for (char decomposedChar : decomposed.toCharArray()) { // ㄱ -> ㅏ -> ㅇ 반복
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

	// 궁합점수로 궁합결과 조회
	public Compatibility selectCompatibilityResult(int compatibilityScore) {
		Compatibility c = animalnameDao.selectCompatibilityResult(compatibilityScore);
		c.setCompatibilityScore(compatibilityScore);
		return c;
	}

	// 이름 궁합 검색어(이름 2개)저장
	@Transactional
	public int insertCompatibilityName(String name1, String name2, int compatibilityNo) {
		System.out.println("궁합번호 : " + compatibilityNo);
		Compatibility c = new Compatibility();
		c.setCompatibilityNo(compatibilityNo);
		c.setName1(name1);
		c.setName2(name2);
		int search = animalnameDao.insertCompatibilityName(c);
		return search;
	}

	// 조회 당일 + 동일한 이름들로(순서 차등) + 운세받은 기록이 있는 지 확인
	// 기록이 없다면, 새로 랜덤으로 운세 하나 가져와서 luck 저장
	@Transactional
	public Luck selectLuck(String name1, String name2) {
		System.out.println("여기는 서비스  : "  + name1 + " " +  name2);

		Luck luck = new Luck();
		luck.setName1(name1);
		luck.setName2(name2);

		// 동일한 이름들로 운세받은 기록이 있는 지 확인
		Luck existingLuck = animalnameDao.selectExistLuck(luck);
		System.out.println("실행전 : " + existingLuck);

		if (existingLuck != null) {
			Luck existingLuckResult = animalnameDao.selectExistLuckResult(existingLuck.getLuckNo());
			System.out.println("여기는 기존운세조회결과 " + existingLuckResult );
			return existingLuckResult; // 기존 운세 정보를 반환합니다.
		}

		// 기록이 없다면, 새로 랜덤으로 운세 하나 가져와서 luck 저장
		Luck newLuck = animalnameDao.selectLuckResult();
		if (newLuck != null) {
			newLuck.setName1(name1);
			newLuck.setName2(name2);
			System.out.println("결과는  ? " + newLuck);
			int result = animalnameDao.insertLuck(newLuck);
			if (result != 1) {
				return null; // 삽입한 새로운 운세 정보를 반환합니다.
			}
		}
		return newLuck;

	}

	public int totalCompatibilityCount() {
		int result = animalnameDao.totalCompatibilityCount();
		return result;
	}


}