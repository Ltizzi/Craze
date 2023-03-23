const express = require("express");
const { checkLoggedIn, checkIsAdmin } = require("../../services/security");

const {
  httpGetAllMemes,
  httpGetAllSoftDeletedMemes,
  httpGetAllMemesWithoutComments,
  httpGetAllCommentsFromMemeById,
  httpGetMemeById,
  httpGetAllMemesByTag,
  httpGetAllMemesByTemplate,
  httpGetAllMemesByUser,
  httpGetUserMemesWoC,
  httpGetUserComments,
  httpGetUserLoopedMemes,
  httpGetUserLikedMemes,
  httpSaveMeme,
  httpUpdateMeme,
  httpDeleteMeme,
  httpAddCommentToMeme,
  httpLikeMeme,
  httpLoopMeme,
} = require("./memes.controller");

const memesRouter = express.Router();

memesRouter.get("/", httpGetAllMemes);
memesRouter.get("/softDeleted", httpGetAllSoftDeletedMemes);
memesRouter.get("/allWoC", httpGetAllMemesWithoutComments);
memesRouter.get("/getCommentsById", httpGetAllCommentsFromMemeById);
memesRouter.get("/byId", httpGetMemeById);
memesRouter.get("/byTag", httpGetAllMemesByTag);
memesRouter.get("/byTemplate", httpGetAllMemesByTemplate);
memesRouter.get("/byUser", httpGetAllMemesByUser);
memesRouter.get("/byUserWoC", httpGetUserMemesWoC);
memesRouter.get("/byUserComments", httpGetUserComments);
memesRouter.get("/byUserLoopedMemes", httpGetUserLoopedMemes);
memesRouter.get("/byUserLikedMemes", httpGetUserLikedMemes);
memesRouter.post("/new", checkLoggedIn, httpSaveMeme);
memesRouter.post("/comment", checkLoggedIn, httpAddCommentToMeme);
memesRouter.post("/like", checkLoggedIn, httpLikeMeme);
memesRouter.post("/loop", checkLoggedIn, httpLoopMeme);
memesRouter.patch("/update", checkLoggedIn, httpUpdateMeme);
memesRouter.delete("/delete", checkLoggedIn, httpDeleteMeme);

module.exports = memesRouter;
