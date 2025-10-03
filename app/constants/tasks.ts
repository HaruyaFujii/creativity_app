import { Tasks } from "../../types/types";

export const tasks: Tasks[] = [
    {
        id: 'autTask',
        name: 'Alternative Uses Test(AUT)',
        description: 'A test to evaluate divergent thinking by asking participants to think of unusual uses for common objects.',
        questions: [
            { id: 'a1', text_ja: '3分間でペーパークリップの非日常的な(オリジナルで創造的な)使用用途をできるだけたくさん答えなさい。', text_en: 'Think of unusual uses for a paperclip as you can think of in 3 minutes.', used: false },
            { id: 'a2', text_ja: '3分間でレンガの非日常的な(オリジナルで創造的な)使用用途をできるだけたくさん答えなさい。', text_en: 'Think of unusual uses for a brick as you can think of in 3 minutes.', used: false },
            { id: 'a3', text_ja: '3分間で靴の非日常的な(オリジナルで創造的な)使用用途をできるだけたくさん答えなさい。', text_en: 'Think of unusual uses for shoes as you can think of in 3 minutes.', used: false },
            { id: 'a4', text_ja: '3分間でナイフの非日常的な(オリジナルで創造的な)使用用途をできるだけたくさん答えなさい。', text_en: 'Think of unusual uses for knives as you can think of in 3 minutes.', used: false },
        ],
        timeLimit: 180 // 3 minutes
    },
    {
        id: 'ratTask',
        name: 'Remote Associates Test(RAT)',
        description: 'A test to evaluate convergent thinking by asking participants to find a common word that connects three given words.',
        questions: [
            { id: 'r1', text_ja: '「専」、「入」、「祈」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "blue", "sky", and "ocean".', used: false },
            { id: 'r2', text_ja: '「短」、「延」、「使」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。。', text_en: 'Find a word that connects "doctor", "nurse", and "hospital".', used: false },
            { id: 'r3', text_ja: '「伝」、「到」、「舶」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r4', text_ja: '「独」、「献」、「脂」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r5', text_ja: '「終」、「休」、「錆」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r6', text_ja: '「製」、「構」、「指」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r7', text_ja: '「素」、「個」、「習」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r8', text_ja: '「発」、「旅」、「株」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r9', text_ja: '「話」、「技」、「療」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r10', text_ja: '「輸」、「混」、「止」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r11', text_ja: '「達」、「芸」、「使」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r12', text_ja: '「電」、「暴」、「鼓」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r13', text_ja: '「果」、「食」、「皮」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r14', text_ja: '「適」、「見」、「談」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r15', text_ja: '「分」、「種」、「障」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r16', text_ja: '「愛」、「必」、「秒」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r17', text_ja: '「父」、「母」、「彼」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r18', text_ja: '「筋」、「入」、「換」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r19', text_ja: '「民」、「家」、「飼」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
            { id: 'r20', text_ja: '「労」、「火」、「願」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
        ],
        timeLimit: 60 // 1 minutes per 1 problem
    },
    {
        id: 'insightTask',
        name: 'Insight Problem Solving',
        description: "A test to evaluate the insight problem-solving ability by asking participants to reconstruct the problem.",
        questions: [
            { id: 'i1', text_ja: '机の上にロウソク、マッチ棒、画鋲が入った箱が存在します。\n壁にロウソクを固定し、溶けたロウが机に垂れないようにするにはどうすればよいでしょうか。', text_en: 'There are a candle, matchsticks, and a box of thumb tacks on the desk.\nHow can you attach the candle to the wall and prevent the melted wax from dripping onto the desk?', used: false },
            { id: 'i2', text_ja: '「布が破れたので干し草の山は重要だった」\nこの文はどのような状況を指すでしょうか。', text_en: '"The haystack was important because the cloth ripped"\n What situation is indicated from this sentence?', used: false },
            { id: 'i3', text_ja: '人が死んだのに犯人は正当化されました\nなぜでしょうか。', text_en: 'Why was the perpetrator justified even though someone died?', used: false },
        ],
        timeLimit: 300 // 考えるための十分な時間を与える
    }
]
