import { Activity, ActivityType } from '../types';

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    type: ActivityType.CLASS,
    category: 'Machine Learning',
    instructor: 'Dr. Anil Kumar',
    progress: 40,
    durationLeft: '2 hrs left',
  },
  {
    id: '7',
    title: 'Advanced ML Algorithms',
    type: ActivityType.CLASS,
    category: 'Machine Learning',
    instructor: 'Prof. Rameshuu',
    progress: 99.1,
    durationLeft: '4 hrs left',
  },

  {
    id: '3',
    title: 'Deep Learning Fundamentals',
    type: ActivityType.CLASS,
    category: 'AI',
    instructor: 'Prof. Neha Sharma',
    progress: 75,
    durationLeft: '1 hr left',
  },
  {
    id: '9',
    title: 'Natural Language Processing',
    type: ActivityType.CLASS,
    category: 'AI',
    instructor: 'Dr. Sandeep Verma',
    progress: 85,
    durationLeft: '30 mins left',
  },

  {
    id: '5',
    title: 'AWS Services Overview',
    type: ActivityType.CLASS,
    category: 'Cloud Computing',
    instructor: 'Dr. Prakash Rao',
    progress: 60,
    durationLeft: '3 hrs left',
  },
  {
    id: '11',
    title: 'Azure Cloud Architecture',
    type: ActivityType.CLASS,
    category: 'Cloud Computing',
    instructor: 'Prof. Karthik Srinivasan',
    progress: 30,
    durationLeft: '5 hrs left',
  },

  {
    id: '2',
    title: 'Neural Networks Quiz',
    type: ActivityType.QUIZ,
    category: 'AI',
    dueDate: 'Due tomorrow, 11:59 PM',
    status: 'PENDING',
  },

  {
    id: '6',
    title: 'Supervised Learning Quiz',
    type: ActivityType.QUIZ,
    category: 'Machine Learning',
    dueDate: 'Due tomorrow, 11:59 PM',
    status: 'COMPLETED',
  },
  {
    id: '10',
    title: 'ML Algorithms Assignment',
    type: ActivityType.ASSIGNMENT,
    category: 'Machine Learning',
    dueDate: 'Due Friday, Jan 23',
    status: 'PENDING',
  },

  {
    id: '4',
    title: 'Cloud Architecture Assignment',
    type: ActivityType.ASSIGNMENT,
    category: 'Cloud Computing',
    dueDate: 'Due Friday, Jan 23',
    status: 'PENDING',
  },
  {
    id: '8',
    title: 'Kubernetes Deployment Quiz',
    type: ActivityType.QUIZ,
    category: 'Cloud Computing',
    dueDate: 'Due tomorrow, 11:59 PM',
    status: 'PENDING',
  },
];
