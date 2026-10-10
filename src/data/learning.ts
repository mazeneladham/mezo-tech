/**
 * Learning topics — shown on the home page ("Currently learning") and the
 * Learning page. Edit freely; these are examples, not claims of mastery.
 *
 * group:  where the topic appears on the Learning page
 *         'currently' | 'practicing' | 'exploring'
 * status: neutral label shown on the card
 *         'learning' | 'practicing' | 'exploring' | 'building'
 * relatedProjects / relatedPosts: translationKeys of content you want linked.
 * home:   true = also shown in the home page "Currently learning" strip.
 *
 * No percentages or proficiency levels — on purpose.
 */
import type { Lang } from '../i18n/ui';

export type LearningGroup = 'currently' | 'practicing' | 'exploring';
export type LearningStatus = 'learning' | 'practicing' | 'exploring' | 'building';

export interface LearningTopic {
  id: string;
  group: LearningGroup;
  status: LearningStatus;
  home?: boolean;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  relatedProjects?: string[];
  relatedPosts?: string[];
}

export const learningTopics: LearningTopic[] = [
  {
    id: 'c-programming',
    group: 'currently',
    status: 'learning',
    home: true,
    title: { en: 'C Programming', ar: 'لغة C' },
    description: {
      en: 'Memory, pointers and how programs really run.',
      ar: 'الذاكرة والمؤشرات وكيف تعمل البرامج فعليًا.',
    },
    relatedPosts: ['understanding-pointers-in-c'],
    relatedProjects: ['grade-calculator-cli'],
  },
  {
    id: 'python',
    group: 'currently',
    status: 'learning',
    home: true,
    title: { en: 'Python', ar: 'بايثون' },
    description: {
      en: 'Scripting, automation and quick experiments.',
      ar: 'كتابة السكربتات والأتمتة والتجارب السريعة.',
    },
  },
  {
    id: 'software-engineering',
    group: 'currently',
    status: 'learning',
    home: true,
    title: { en: 'Software Engineering', ar: 'هندسة البرمجيات' },
    description: {
      en: 'Version control, testing and writing code that lasts.',
      ar: 'التحكم في الإصدارات والاختبار وكتابة شيفرة تدوم.',
    },
    relatedPosts: ['getting-started-with-git-and-github'],
  },
  {
    id: 'artificial-intelligence',
    group: 'exploring',
    status: 'exploring',
    home: true,
    title: { en: 'Artificial Intelligence', ar: 'الذكاء الاصطناعي' },
    description: {
      en: 'Understanding the fundamentals before chasing the hype.',
      ar: 'فهم الأساسيات قبل مطاردة الضجّة.',
    },
  },
  {
    id: 'embedded-systems',
    group: 'exploring',
    status: 'exploring',
    home: true,
    title: { en: 'Embedded Systems', ar: 'الأنظمة المدمجة' },
    description: {
      en: 'Programming close to the hardware with microcontrollers.',
      ar: 'البرمجة بالقرب من العتاد باستخدام المتحكمات الدقيقة.',
    },
  },
  {
    id: 'electronics',
    group: 'exploring',
    status: 'exploring',
    home: true,
    title: { en: 'Electronics', ar: 'الإلكترونيات' },
    description: {
      en: 'Circuits and components that software eventually talks to.',
      ar: 'الدوائر والمكوّنات التي تتعامل معها البرمجيات في النهاية.',
    },
  },
  {
    id: 'git-and-github',
    group: 'practicing',
    status: 'practicing',
    title: { en: 'Git & GitHub workflow', ar: 'العمل بـ Git و GitHub' },
    description: {
      en: 'Committing, branching and publishing projects in small steps.',
      ar: 'الالتزام بالتغييرات والتفريع ونشر المشاريع على خطوات صغيرة.',
    },
    relatedPosts: ['getting-started-with-git-and-github'],
  },
  {
    id: 'web-basics',
    group: 'practicing',
    status: 'building',
    title: { en: 'Web fundamentals', ar: 'أساسيات الويب' },
    description: {
      en: 'HTML, CSS and a little JavaScript, applied by building this site.',
      ar: 'HTML وCSS وقليل من JavaScript، تُطبَّق ببناء هذا الموقع.',
    },
    relatedProjects: ['mezo-tech-portfolio-template'],
  },
];

export const learningGroups: LearningGroup[] = ['currently', 'practicing', 'exploring'];
