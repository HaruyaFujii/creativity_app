import { Tasks } from "../../types/types";

export const tasks: Tasks[] = [
    {
        rotate: [
            'AUTScreen', 
            'RATScreen',
            'InsightScreen'
        ],
        count: 1,
        tasks: [
            {
                id: 'autTask',
                name: 'Alternative Uses Test(AUT)',
                description: 'A test to evaluate divergent thinking by asking participants to think of unusual uses for common objects.',
                questions: [
                    { id: 'a1', text_ja: '3分間でペーパークリップの非日常的な(オリジナルで創造的な)使用用途をできるだけたくさん答えなさい。', text_en: 'Think of unusual uses for a paperclip as you can think of in 3 minutes.', used: false },
                ],
                timeLimit: 180 // 3 minutes   
            },
            {
                id: 'ratTask',
                name: 'Remote Associates Test(RAT)',
                description: 'A test to evaluate convergent thinking by asking participants to find a common word that connects three given words.',
                questions: [
                    { id: 'r1', text_ja: '「打」、「欠」、「始」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "blue", "sky", and "ocean".', used: false },
                    { id: 'r2', text_ja: '「短」、「延」、「使」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。。', text_en: 'Find a word that connects "doctor", "nurse", and "hospital".', used: false },
                    { id: 'r3', text_ja: '「伝」、「到」、「舶」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
                    { id: 'r4', text_ja: '「独」、「献」、「脂」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
                    { id: 'r5', text_ja: '「終」、「休」、「錆」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
                ],
                timeLimit: 60 // 1 minutes   
            },
            {
                id: 'insightTask',
                name: 'Insight Problem Solving',
                description: "A test to evaluate the insight problem-solving ability by asking participants to reconstruct the problem.",
                questions: [
                    { id: 'i1', text_ja: '机の上にロウソク、マッチ棒、画鋲が入った箱が存在します。\n壁にロウソクを固定し、溶けたロウが机に垂れないようにするにはどうすればよいでしょうか。', text_en: 'There are a candle, matchsticks, and a box of thumb tacks on the desk.\nHow can you attach the candle to the wall and prevent the melted wax from dripping onto the desk?', used: false },
                ],
                timeLimit: 300 // 考えるための十分な時間を与える
            }
        ]
    },
    {
        rotate: [
            'RATScreen',
            'InsightScreen',
            'AUTScreen'
        ],
        count: 2,
        tasks: [
            {
                id: 'autTask',
                name: 'Alternative Uses Test(AUT)',
                description: 'A test to evaluate divergent thinking by asking participants to think of unusual uses for common objects.',
                questions: [
                    { id: 'a2', text_ja: '3分間でレンガの非日常的な(オリジナルで創造的な)使用用途をできるだけたくさん答えなさい。', text_en: 'Think of unusual uses for a brick as you can think of in 3 minutes.', used: false },
                ],
                timeLimit: 180 // 3 minutes   
            },
            {
                id: 'ratTask',
                name: 'Remote Associates Test(RAT)',
                description: 'A test to evaluate convergent thinking by asking participants to find a common word that connects three given words.',
                questions: [
                    { id: 'r6', text_ja: '「作」、「実」、「奮」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
                    { id: 'r7', text_ja: '「素」、「個」、「習」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
                    { id: 'r8', text_ja: '「製」、「構」、「指」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
                    { id: 'r9', text_ja: '「特」、「変」、「驚」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
                    { id: 'r10', text_ja: '「輸」、「混」、「止」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
                ],
                timeLimit: 60 // 1 minutes   
            },
            {
                id: 'insightTask',
                name: 'Insight Problem Solving',
                description: "A test to evaluate the insight problem-solving ability by asking participants to reconstruct the problem.",
                questions: [
                    { id: 'i2', text_ja: '「布が破れたので干し草の山は重要だった」\nこの文はどのような状況を指すでしょうか。', text_en: '"The haystack was important because the cloth ripped"\n What situation is indicated from this sentence?', used: false },
                ],
                timeLimit: 300 // 考えるための十分な時間を与える
            }
        ]
    },
    {
        rotate: [
            'InsightScreen',
            'AUTScreen',
            'RATScreen'
        ],
        count: 3,
        tasks: [
            {
                id: 'autTask',
                name: 'Alternative Uses Test(AUT)',
                description: 'A test to evaluate divergent thinking by asking participants to think of unusual uses for common objects.',
                questions: [
                    { id: 'a3', text_ja: '3分間で靴の非日常的な(オリジナルで創造的な)使用用途をできるだけたくさん答えなさい。', text_en: 'Think of unusual uses for shoes as you can think of in 3 minutes.', used: false },
                ],
                timeLimit: 180 // 3 minutes   
            },
            {
                id: 'ratTask',
                name: 'Remote Associates Test(RAT)',
                description: 'A test to evaluate convergent thinking by asking participants to find a common word that connects three given words.',
                questions: [
                    { id: 'r11', text_ja: '「果」、「食」、「皮」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
                    { id: 'r12', text_ja: '「電」、「暴」、「鼓」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
                    { id: 'r13', text_ja: '「達」、「芸」、「使」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
                    { id: 'r14', text_ja: '「在」、「住」、「汚」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
                    { id: 'r15', text_ja: '「分」、「種」、「障」をそれぞれつなぐ漢字を、ただ1つ見つけなさい。', text_en: 'Find a word that connects "light", "bulb", and "electricity".', used: false },
                ],
                timeLimit: 60 // 1 minutes   
            },
            {
                id: 'insightTask',
                name: 'Insight Problem Solving',
                description: "A test to evaluate the insight problem-solving ability by asking participants to reconstruct the problem.",
                questions: [
                    { id: 'i3', text_ja: '人が死んだのに犯人は正当化されました\nなぜでしょうか。', text_en: 'Why was the perpetrator justified even though someone died?', used: false },
                ],
                timeLimit: 300 // 考えるための十分な時間を与える
            }
        ]
    }
]