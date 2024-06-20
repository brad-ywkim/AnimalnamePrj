package kr.co.util;

import org.springframework.stereotype.Component;

@Component
public class HangulDecomposer {
	  // 한글 초성, 중성, 종성 분해
    private static final char[] CHO_SUNG = {
            'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    };

    private static final char[] JUNG_SUNG = {
            'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
    };

    private static final char[] JONG_SUNG = {
            '\0', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    };

    public static String decompose(char hangul) {
        if (hangul < 0xAC00 || hangul > 0xD7A3) {
            return String.valueOf(hangul);
        }
        
        int base = hangul - 0xAC00;
        int cho = base / (21 * 28);
        int jung = (base % (21 * 28)) / 28;
        int jong = base % 28;

        return "" + CHO_SUNG[cho] + JUNG_SUNG[jung] + (jong != 0 ? JONG_SUNG[jong] : "");
    }
}