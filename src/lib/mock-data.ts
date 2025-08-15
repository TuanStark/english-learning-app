import { Exam, Question, VocabularyWord, GrammarLesson } from '@/types';

export const mockQuestions: Question[] = [
  {
    id: '1',
    type: 'multiple-choice',
    content: 'What is the correct form of the verb in this sentence: "She _____ to the store every day."',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 'goes',
    explanation: 'With third person singular subjects (she, he, it), we add -s to the base form of the verb in present simple tense.'
  },
  {
    id: '2',
    type: 'multiple-choice',
    content: 'Choose the best answer: "I have been working here _____ 2020."',
    options: ['since', 'for', 'from', 'during'],
    correctAnswer: 'since',
    explanation: '"Since" is used with a specific point in time, while "for" is used with a duration.'
  },
  {
    id: '3',
    type: 'multiple-choice',
    content: 'Which word has the same meaning as "enormous"?',
    options: ['tiny', 'huge', 'medium', 'small'],
    correctAnswer: 'huge',
    explanation: '"Enormous" means extremely large or huge in size.'
  },
  {
    id: '4',
    type: 'multiple-choice',
    content: 'Complete the sentence: "If I _____ rich, I would travel around the world."',
    options: ['am', 'was', 'were', 'will be'],
    correctAnswer: 'were',
    explanation: 'In hypothetical conditional sentences (second conditional), we use "were" for all persons after "if".'
  },
  {
    id: '5',
    type: 'multiple-choice',
    content: 'What is the past participle of "bring"?',
    options: ['brang', 'brought', 'bringed', 'brung'],
    correctAnswer: 'brought',
    explanation: '"Bring" is an irregular verb: bring - brought - brought.'
  }
];

export const mockExams: Exam[] = [
  {
    id: 'toeic-basic-1',
    title: 'TOEIC Practice Test - Basic Level',
    type: 'TOEIC',
    difficulty: 'Beginner',
    duration: 30,
    questionCount: 20,
    imageUrl: '/images/toeic-basic.jpg',
    description: 'A basic TOEIC practice test covering fundamental grammar and vocabulary.',
    questions: mockQuestions.slice(0, 5)
  },
  {
    id: 'ielts-intermediate-1',
    title: 'IELTS Reading Practice - Intermediate',
    type: 'IELTS',
    difficulty: 'Intermediate',
    duration: 45,
    questionCount: 15,
    imageUrl: '/images/ielts-reading.jpg',
    description: 'IELTS reading comprehension practice with academic texts.',
    questions: mockQuestions.slice(2, 5)
  },
  {
    id: 'toeic-listening-1',
    title: 'TOEIC Listening Practice',
    type: 'TOEIC',
    difficulty: 'Intermediate',
    duration: 25,
    questionCount: 10,
    imageUrl: '/images/toeic-listening.jpg',
    description: 'Practice your listening skills with TOEIC-style audio questions.',
    questions: mockQuestions.slice(0, 3)
  },
  {
    id: 'ielts-advanced-1',
    title: 'IELTS Writing Task 1 - Advanced',
    type: 'IELTS',
    difficulty: 'Advanced',
    duration: 60,
    questionCount: 25,
    imageUrl: '/images/ielts-writing.jpg',
    description: 'Advanced IELTS writing practice with complex academic topics.',
    questions: mockQuestions
  }
];

export const mockVocabulary: VocabularyWord[] = [
  {
    id: '1',
    word: 'accomplish',
    pronunciation: '/əˈkʌmplɪʃ/',
    meaning: 'to succeed in doing or completing something',
    example: 'She accomplished her goal of learning English in one year.',
    category: 'Academic',
    level: 'Intermediate',
    isLearned: false
  },
  {
    id: '2',
    word: 'efficient',
    pronunciation: '/ɪˈfɪʃənt/',
    meaning: 'working in a well-organized way',
    example: 'The new system is more efficient than the old one.',
    category: 'Business',
    level: 'Intermediate',
    isLearned: true
  },
  {
    id: '3',
    word: 'fundamental',
    pronunciation: '/ˌfʌndəˈmentl/',
    meaning: 'forming a necessary base or core; central',
    example: 'Reading is fundamental to learning any language.',
    category: 'Academic',
    level: 'Advanced',
    isLearned: false
  }
];

export const mockGrammarLessons: GrammarLesson[] = [
  {
    id: '1',
    title: 'Present Simple Tense',
    content: `The present simple tense is used to describe habits, facts, and general truths. 

Formation:
- Positive: Subject + base verb (+ s/es for 3rd person singular)
- Negative: Subject + don't/doesn't + base verb
- Question: Do/Does + subject + base verb?`,
    examples: [
      'I work in an office.',
      'She speaks three languages.',
      'They don\'t like coffee.',
      'Do you play tennis?'
    ],
    exercises: mockQuestions.slice(0, 2),
    level: 'Basic'
  },
  {
    id: '2',
    title: 'Conditional Sentences',
    content: `Conditional sentences express hypothetical situations and their consequences.

Types:
- First conditional: If + present simple, will + base verb
- Second conditional: If + past simple, would + base verb
- Third conditional: If + past perfect, would have + past participle`,
    examples: [
      'If it rains, I will stay home.',
      'If I were rich, I would buy a house.',
      'If I had studied, I would have passed the exam.'
    ],
    exercises: mockQuestions.slice(3, 4),
    level: 'Intermediate'
  }
];

export const featuredCourses = [
  {
    id: '1',
    title: 'TOEIC Complete Course',
    description: 'Master all sections of TOEIC with comprehensive practice tests',
    level: 'All Levels',
    duration: '40 hours',
    lessons: 120,
    rating: 4.8,
    image: '/images/toeic-course.jpg'
  },
  {
    id: '2',
    title: 'IELTS Academic Preparation',
    description: 'Prepare for IELTS Academic with expert guidance',
    level: 'Intermediate+',
    duration: '35 hours',
    lessons: 100,
    rating: 4.9,
    image: '/images/ielts-course.jpg'
  },
  {
    id: '3',
    title: 'Business English Essentials',
    description: 'Essential vocabulary and phrases for professional communication',
    level: 'Intermediate',
    duration: '25 hours',
    lessons: 80,
    rating: 4.7,
    image: '/images/business-course.jpg'
  }
];
