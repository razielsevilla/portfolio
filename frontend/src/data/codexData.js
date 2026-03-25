// src/data/codexData.js
// The Codex — Chapter IV: Philosophy & Beliefs
// PLACEHOLDER — update these entries with your own voice.

const codexData = {
  intro: `Every line of code I write is a small argument about what software should be.
This is a record of the principles I keep coming back to — the ones that shape
how I think, build, and collaborate.`,

  principles: [
    {
      label: '// principle_01',
      statement: 'Software should feel inevitable, not impressive.',
      note: 'The best interfaces disappear. The user should never see your effort — only the result.',
    },
    {
      label: '// principle_02',
      statement: 'A system you cannot explain is a system you do not own.',
      note: 'I document things the way I wish they had been documented for me.',
    },
    {
      label: '// principle_03',
      statement: 'Complexity is not depth. Clarity is the harder achievement.',
      note: '— Placeholder. Update with your own conviction here.',
    },
    {
      label: '// principle_04',
      statement: 'The reader always comes first — whether that reader is a user or another developer.',
      note: '— Placeholder. This one should feel personal to your experience.',
    },
  ],

  readingList: [
    { title: 'The Pragmatic Programmer',  author: 'Hunt & Thomas',    note: 'How I think about ownership.' },
    { title: '— [Book Title Here] —',     author: '— Author —',       note: '// placeholder — add a book that shaped you' },
    { title: '— [Book Title Here] —',     author: '— Author —',       note: '// placeholder — add another' },
  ],

  closingNote: `// TODO: keep learning. keep shipping. keep reading.\n// This codex is a living document — like all good software.`,
};

export default codexData;
