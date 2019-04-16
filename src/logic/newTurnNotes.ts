const number_re = /\[-?[0-9]+\]/g;

function newTurnNotes(notes: string): string {
  const matches = notes.match(number_re);
  if (!matches) {
    return notes;
  }

  for (const matchStr of matches) {
    const number = Number(matchStr.slice(1, -1));
    const mewNum = number - 1;
    const newStr = `[${mewNum}]`;

    notes = notes.replace(matchStr, newStr);
  }

  return notes;
}

export default newTurnNotes;