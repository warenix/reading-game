import { Article } from '../types';

export const articles: Article[] = [
  {
    id: 1,
    title: "The History of Space Exploration",
    content: `Space exploration has captivated human imagination for centuries. The modern era of space exploration began in 1957 when the Soviet Union launched Sputnik 1, the first artificial satellite to orbit Earth. This achievement sparked what became known as the Space Race between the United States and the Soviet Union. The competition reached its peak in 1969 when NASA's Apollo 11 mission successfully landed humans on the Moon. Since then, space exploration has evolved into a collaborative international effort, with the International Space Station serving as a symbol of peaceful cooperation in space research. Today, private companies like SpaceX and Blue Origin are pushing the boundaries of space travel, making it more accessible and opening new possibilities for human exploration of Mars and beyond.`,
    questions: [
      {
        id: 1,
        text: "What event marked the beginning of the modern era of space exploration?",
        choices: [
          "The Moon landing",
          "The launch of Sputnik 1",
          "The creation of NASA",
          "The first human in space"
        ],
        correctAnswer: 1,
        explanation: "The modern era of space exploration began in 1957 with the Soviet Union's launch of Sputnik 1, the first artificial satellite to orbit Earth.",
        supportingTextRange: [87, 170]
      },
      {
        id: 2,
        text: "What was the Space Race primarily between?",
        choices: [
          "NASA and SpaceX",
          "The United States and China",
          "The United States and the Soviet Union",
          "Russia and Europe"
        ],
        correctAnswer: 2,
        explanation: "The Space Race was a competition between the United States and the Soviet Union.",
        supportingTextRange: [172, 246]
      },
      {
        id: 3,
        text: "What significant achievement occurred in 1969?",
        choices: [
          "The first satellite launch",
          "The creation of the International Space Station",
          "The first human Moon landing",
          "The first Mars mission"
        ],
        correctAnswer: 2,
        explanation: "In 1969, NASA's Apollo 11 mission achieved the first human Moon landing.",
        supportingTextRange: [247, 317]
      },
      {
        id: 4,
        text: "What represents international cooperation in space research?",
        choices: [
          "The Space Race",
          "The International Space Station",
          "SpaceX missions",
          "Sputnik 1"
        ],
        correctAnswer: 1,
        explanation: "The International Space Station serves as a symbol of peaceful cooperation in space research.",
        supportingTextRange: [318, 419]
      },
      {
        id: 5,
        text: "Which companies are currently advancing space travel?",
        choices: [
          "NASA and Soviet Union",
          "Boeing and Airbus",
          "SpaceX and Blue Origin",
          "NASA and ESA"
        ],
        correctAnswer: 2,
        explanation: "Private companies SpaceX and Blue Origin are currently pushing the boundaries of space travel.",
        supportingTextRange: [420, 570]
      }
    ]
  },
  {
    id: 2,
    title: "The Basics of Photosynthesis",
    content: `Photosynthesis is the process by which plants convert light energy into chemical energy. This remarkable process occurs in the chloroplasts of plant cells, specifically using the green pigment chlorophyll. During photosynthesis, plants take in carbon dioxide from the air and water from the soil. Using sunlight as an energy source, they transform these ingredients into glucose and oxygen. The glucose serves as food for the plant, while the oxygen is released into the atmosphere as a byproduct. This process is crucial for life on Earth as it provides the oxygen we breathe and the food we eat. Without photosynthesis, most life forms on Earth would not exist. The process also plays a vital role in the global carbon cycle, helping to regulate Earth's climate.`,
    questions: [
      {
        id: 1,
        text: "Where does photosynthesis occur in plant cells?",
        choices: [
          "In the nucleus",
          "In the chloroplasts",
          "In the mitochondria",
          "In the cell wall"
        ],
        correctAnswer: 1,
        explanation: "Photosynthesis occurs in the chloroplasts of plant cells, which contain the chlorophyll pigment.",
        supportingTextRange: [116, 181]
      },
      {
        id: 2,
        text: "What are the main ingredients needed for photosynthesis?",
        choices: [
          "Oxygen and glucose",
          "Carbon dioxide and oxygen",
          "Carbon dioxide and water",
          "Water and glucose"
        ],
        correctAnswer: 2,
        explanation: "Plants take in carbon dioxide from the air and water from the soil for photosynthesis.",
        supportingTextRange: [182, 246]
      }
    ]
  }
];