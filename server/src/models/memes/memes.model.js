const memesRepo = require("./memes.mongo");
//const axios = require("axios");

const DEFAULT_MEME_ID = 1;

async function getAllMemes(skip, limit) {
  return await memesRepo
    .find({}, { _id: 0, __v: 0 })
    .sort({ memeId: 1 })
    .skip(skip)
    .limit(limit);
}

async function getMemesByUser(user_id) {
  return await findMeme({ uploader: user_id });
}

async function getMemesByTag(tag) {
  return await findMeme({ tags: tag });
}

async function getMemesByTemplate(template) {
  return await findMeme({ template: template });
}

async function getMemeById(id) {
  return await findMeme({ memeId: id });
}

async function getLastMemeId() {
  const lastMeme = await memesRepo.findOne().sort("-memeId");
  if (!lastMeme) {
    return DEFAULT_MEME_ID;
  }
  return lastMeme.memeId;
}

async function saveMeme(meme) {
  const newMemeId = (await getLastMemeId()) + 1;
  const newMeme = Object.assign(meme, {
    memeId: newMemeId,
    isComment: false,
    likes: 0,
    createdAt: new Date.now(),
  });
  await memesRepo.findOneAndUpdate({ memeId: newMeme.memeId }, newMeme, {
    upsert: true,
  });
}

async function deleteMeme(id) {
  const softDeleted = await memesRepo.updateOne(
    { memeId: id },
    { softDeleted: true, updatedAt: new Date.now() }
  );
  return softDeleted.acknowledged === true && softDeleted.modifiedCount === 1;
}

async function findMeme(filter) {
  return await memesRepo.findOne(filter);
}

module.exports = {
  getAllMemes,
  getMemeById,
  getMemesByTag,
  getMemesByUser,
  getMemesByTemplate,
  getLastMemeId,
  saveMeme,
  deleteMeme,
};
