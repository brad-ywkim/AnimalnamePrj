package kr.co.animalname.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.animalname.ResponseDTO;
import kr.co.animalname.model.dto.Animalname;
import kr.co.animalname.model.service.AnimalnameService;

@CrossOrigin("*")
@RestController // 비동기 responseBody 역할을 포함
@RequestMapping(value = "/animalname")
public class AnimalnameController {

    @Autowired
    private AnimalnameService animalnameService;

    @GetMapping(value = "/{reqPage}/{searchName}")
    public ResponseEntity<ResponseDTO> selectAnimalname(@PathVariable int reqPage, @PathVariable String searchName) {
        System.out.println(searchName);
        Map map = animalnameService.selectAnimalname(reqPage, searchName);
        ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", map);
        return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
    }

    @GetMapping(value = "/compatibility/{name1}/{name2}")
    public ResponseEntity<ResponseDTO> selectAnimalnameCompatibility(@PathVariable String name1, @PathVariable String name2) {
    	int search = animalnameService.insertSearchName(name1, name2);

        // 두 이름의 최대 길이를 찾는다
        int maxLength = Math.max(name1.length(), name2.length());

        // 배열을 최대 길이로 초기화하고 부족한 부분은 0으로 채운다
        int[] name1CharToInt = new int[maxLength];
        int[] name2CharToInt = new int[maxLength];

        for (int i = 0; i < maxLength; i++) {
            if (i < name1.length()) {
                name1CharToInt[i] = animalnameService.calculateStrokes(String.valueOf(name1.charAt(i)));
                System.out.println("Character " + (i + 1) + ": " + name1.charAt(i) + " 획수: " + name1CharToInt[i]);
            } else {
                name1CharToInt[i] = 0;
                System.out.println("Character " + (i + 1) + ": " + " 빈 값");
            }
        }

        for (int i = 0; i < maxLength; i++) {
            if (i < name2.length()) {
                name2CharToInt[i] = animalnameService.calculateStrokes(String.valueOf(name2.charAt(i)));
                System.out.println("Character " + (i + 1) + ": " + name2.charAt(i) + " 획수: " + name2CharToInt[i]);
            } else {
                name2CharToInt[i] = 0;
                System.out.println("Character " + (i + 1) + ": " + " 빈 값" + name2CharToInt[i]);
            }
        }


        // 두 배열의 합 계산
        int[] combinedArray = new int[maxLength];
        for (int i = 0; i < maxLength; i++) {
            combinedArray[i] = (name1CharToInt[i] + name2CharToInt[i]) % 10;  // 1의 자리만 사용
            System.out.println("합산 " + (i + 1) + ": " + combinedArray[i]);
        }

        // 합산 배열의 길이 계산 (2번째 배열)
        int[] reducedArray = combinedArray;
        while (reducedArray.length > 2) {
            int[] newArray = new int[reducedArray.length - 1];
            for (int i = 0; i < reducedArray.length - 1; i++) {
                newArray[i] = (reducedArray[i] + reducedArray[i + 1]) % 10;
                System.out.println("축소 합산 " + (i + 1) + ": " + newArray[i]);
            }
            reducedArray = newArray;
        }

        // 궁합 점수 계산
        int compatibilityScore = (reducedArray[0] * 10) + reducedArray[1];
        if(compatibilityScore == 0) {
        	compatibilityScore = 100;
        }
        Animalname result = animalnameService.selectCompatibilityResult(compatibilityScore);
        ResponseDTO response = new ResponseDTO(200, HttpStatus.OK, "success", result);
        return new ResponseEntity<ResponseDTO>(response, response.getHttpStatus());
    }
}
