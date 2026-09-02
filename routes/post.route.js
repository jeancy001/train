import express from 'express'
import { editDocument, getDocuments, postDocument, getDocumentByID, deletePosts } from "../controllers/post.js";
import { upload } from '../middlwares/update.js';
const router  = express.Router()

router.post("/",upload.array("documents", 10),postDocument);
router.get('/',getDocuments)
router.patch("/:id",editDocument)
router.get("/:id", getDocumentByID)
router.delete("/:id", deletePosts)


export {router as documenteRoutes}

