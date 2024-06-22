package kr.co.animalname.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.animalname.ResponseDTO;
import kr.co.animalname.model.dto.AnimalName;
import kr.co.animalname.model.dto.Compatibility;
import kr.co.animalname.model.dto.Luck;
import kr.co.animalname.model.dto.Message;
import kr.co.animalname.model.dto.Milestone;
import kr.co.animalname.model.service.AnimalnameService;

@CrossOrigin("*")
@RestController // 비동기 responseBody 역할을 포함
@RequestMapping(value = "/animalname")
public class AnimalnameController {

	@Autowired
	private AnimalnameService animalnameService;

	// name-stat
	@GetMapping(value = "/realtimeRank")
	public ResponseEntity<ResponseDTO> realtimeRank() {
		Map<String, Object> rankingData = animalnameService.getRealTimeNameRanking();
//		System.out.println("메인로딩 : " + rankingData);
		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", rankingData);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}

	@GetMapping(value = "/{reqPage}/{searchName}")
	public ResponseEntity<ResponseDTO> selectAnimalname(@PathVariable int reqPage, @PathVariable String searchName) {
		if (!searchName.equals("a_l_l")) {
			animalnameService.insertKeyword(searchName);
		}

		Map<String, Object> map = animalnameService.selectAnimalname(reqPage, searchName);

		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}

	// name-detail
	@GetMapping(value = "/animal-detail/{nameNo}")
	public ResponseEntity<ResponseDTO> selectAnimalDetail(@PathVariable int nameNo) {
		AnimalName animalName = animalnameService.selectAnimalDetail(nameNo);
		if (animalName != null) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", animalName);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		} else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}

	@GetMapping(value = "/message/{nameNo}")
	public ResponseEntity<ResponseDTO> selectMessage(@PathVariable int nameNo) {
		List<Message> m = animalnameService.selectMessage(nameNo);
		if (m != null) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", m);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		} else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}

	@PostMapping(value = "/message")
	public ResponseEntity<ResponseDTO> insertMessage(@RequestBody Message m) {
//		System.out.println("받아보자 : " + m);
		int result = animalnameService.insertMessage(m);
		if (result == 1) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", result);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		} else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}

	// main
	@GetMapping(value = "/milestone")
	public ResponseEntity<ResponseDTO> selectMilestone() {
		Milestone milestone = animalnameService.selectMilestone();
		if (milestone != null) {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", milestone);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		} else {
			ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "fail", null);
			return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
		}
	}

	@GetMapping(value = "/compatibility/{name1}/{name2}")
	public ResponseEntity<ResponseDTO> selectCompatibility(@PathVariable String name1, @PathVariable String name2) {

		// 두 이름의 최대 길이를 찾는다
		int maxLength = Math.max(name1.length(), name2.length());

		// 배열을 최대 길이로 초기화하고 부족한 부분은 0으로 채운다
		int[] name1CharToInt = new int[maxLength];
		int[] name2CharToInt = new int[maxLength];

		for (int i = 0; i < maxLength; i++) {
			if (i < name1.length()) {
				name1CharToInt[i] = animalnameService.calculateStrokes(String.valueOf(name1.charAt(i)));
//				System.out.println("Character " + (i + 1) + ": " + name1.charAt(i) + " 획수: " + name1CharToInt[i]);
			} else {
				name1CharToInt[i] = 0;
//				System.out.println("Character " + (i + 1) + ": " + " 빈 값");
			}
		}

		for (int i = 0; i < maxLength; i++) {
			if (i < name2.length()) {
				name2CharToInt[i] = animalnameService.calculateStrokes(String.valueOf(name2.charAt(i)));
//				System.out.println("Character " + (i + 1) + ": " + name2.charAt(i) + " 획수: " + name2CharToInt[i]);
			} else {
				name2CharToInt[i] = 0;
//				System.out.println("Character " + (i + 1) + ": " + " 빈 값" + name2CharToInt[i]);
			}
		}

		// 두 배열의 합 계산
		int[] combinedArray = new int[maxLength];
		for (int i = 0; i < maxLength; i++) {
			combinedArray[i] = (name1CharToInt[i] + name2CharToInt[i]) % 10; // 1의 자리만 사용
//			System.out.println("합산 " + (i + 1) + ": " + combinedArray[i]);
		}

		// 합산 배열의 길이 계산 (2번째 배열)
		int[] reducedArray = combinedArray;
		while (reducedArray.length > 2) {
			int[] newArray = new int[reducedArray.length - 1];
			for (int i = 0; i < reducedArray.length - 1; i++) {
				newArray[i] = (reducedArray[i] + reducedArray[i + 1]) % 10;
//				System.out.println("축소 합산 " + (i + 1) + ": " + newArray[i]);
			}
			reducedArray = newArray;
		}

		// 한 글자인 경우 처리
		int compatibilityScore;
		if (reducedArray.length == 1) {
			compatibilityScore = reducedArray[0];
		} else {
			compatibilityScore = (reducedArray[0] * 10) + reducedArray[1];
		}

		if (compatibilityScore == 0) {
			compatibilityScore = 100;
		}

		Compatibility c = animalnameService.selectCompatibilityResult(compatibilityScore);
		// 이름 궁합 검색어(이름 2개)저장
		int resul = animalnameService.insertCompatibilityName(name1, name2, c.getCompatibilityNo());

		ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", c);
		return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
	}

	@GetMapping(value = "/luck/{name1}/{name2}")
	  public ResponseEntity<ResponseDTO> luck(@PathVariable String name1, @PathVariable String name2) {
        try {
            Luck luckResult = animalnameService.selectLuck(name1, name2);
            ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", luckResult);
            return new ResponseEntity<>(response, response.getHttpStatus());
        } catch (RuntimeException e) {
            ResponseDTO response = new ResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR, "fail", null);
            return new ResponseEntity<>(response, response.getHttpStatus());
        }
    }

}