// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // read users from a local JSON file
  let users = require("/data/users.json");
  // const numberOfRandomUsers = 12
  const shuffledUsers = shuffleArray(users);

  const numberOfRandomUsers = users.length;
  const count = parseInt(req.query.count || 9);
  const start = parseInt(req.query._start || 0);

  // finding the last index
  const end = Math.min(start + count, numberOfRandomUsers);

  let randomUserSubset = users.slice(start, end);

  if (req.query._start === "undefined") {
    randomUserSubset = shuffledUsers.slice(0, req.query.count);
    res.status(200).json(randomUserSubset);
  } else {
    randomUserSubset = shuffledUsers.slice(req.query._start, req.query.count);
    res.status(200).json(randomUserSubset);
  }
}

function shuffleArray(array) {
  // Fisher-Yates (aka Knuth) Shuffle
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
