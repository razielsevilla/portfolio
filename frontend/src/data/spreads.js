// src/data/spreads.js

import PageForeword    from '../components/pages/PageForeword';
import PageChapter1    from '../components/pages/PageChapter1';
import PageChapter2    from '../components/pages/PageChapter2';
import PageChapter3    from '../components/pages/PageChapter3';
import PageInvitation  from '../components/pages/PageInvitation';

/**
 * 18-PAGE (9-SPREAD) MANIFEST
 * Central configuration for the book's content structure.
 */
export const SPREADS = [
  {
    key: 'foreword-0',
    chapter: 'foreword',
    pageIndex: 0,
    navLabel: 'Foreword',
    chapterLabel: 'Foreword',
    Component: PageForeword,
    isChapterStart: true,
  },
  {
    key: 'chapter1-0',
    chapter: 'chapter1',
    pageIndex: 0,
    navLabel: 'The Story So Far',
    chapterLabel: 'Chapter I',
    Component: PageChapter1,
    isChapterStart: true,
  },
  {
    key: 'chapter1-1',
    chapter: 'chapter1',
    pageIndex: 1,
    navLabel: 'The Story So Far',
    chapterLabel: 'Chapter I — cont.',
    Component: PageChapter1,
    isChapterStart: false,
  },
  {
    key: 'chapter2-0',
    chapter: 'chapter2',
    pageIndex: 0,
    navLabel: 'Tools of the Trade',
    chapterLabel: 'Chapter II',
    Component: PageChapter2,
    isChapterStart: true,
  },
  {
    key: 'chapter2-1',
    chapter: 'chapter2',
    pageIndex: 1,
    navLabel: 'Tools of the Trade',
    chapterLabel: 'Chapter II — cont.',
    Component: PageChapter2,
    isChapterStart: false,
  },
  {
    key: 'chapter3-0',
    chapter: 'chapter3',
    pageIndex: 0,
    navLabel: 'Works Published',
    chapterLabel: 'Chapter III',
    Component: PageChapter3,
    isChapterStart: true,
  },
  {
    key: 'chapter3-1',
    chapter: 'chapter3',
    pageIndex: 1,
    navLabel: 'Works Published',
    chapterLabel: 'Chapter III — cont.',
    Component: PageChapter3,
    isChapterStart: false,
  },
  {
    key: 'chapter3-2',
    chapter: 'chapter3',
    pageIndex: 2,
    navLabel: 'Works Published',
    chapterLabel: 'Chapter III — cont.',
    Component: PageChapter3,
    isChapterStart: false,
  },
  {
    key: 'invitation-0',
    chapter: 'invitation',
    pageIndex: 0,
    navLabel: 'The Next Chapter',
    chapterLabel: 'Chapter IV — Open',
    Component: PageInvitation,
    isChapterStart: true,
  },
];

/**
 * Chapter-start spread index for ToC navigation
 */
export const CHAPTER_FIRST_SPREAD = SPREADS.reduce((acc, s, i) => {
  if (s.isChapterStart) {
    acc[s.chapter] = i;
  }
  return acc;
}, {});
