import { Posts } from "../models/Post.js";
import { supabase } from "../config/supabase.js";
import crypto from "crypto";

// CREATE DOCUMENT
const postDocument = async (req, res) => {
  const { nom, postnom, prenom } = req.body;

  try {
    if (!nom || !postnom || !prenom) {
      return res
        .status(400)
        .json({ message: "Veuillez inserer les informations !" });
    }

    const documentUrls = [];

    // Upload documents to Supabase
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileName = `${crypto.randomUUID()}-${file.originalname}`;

        const { error } = await supabase.storage
          .from("documents")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
          });

        if (error) {
          throw new Error(error.message);
        }

        // Get Supabase public URL
        const { data } = supabase.storage
          .from("documents")
          .getPublicUrl(fileName);

        documentUrls.push(data.publicUrl);
      }
    }

    const newPosts = new Posts({
      nom: nom,
      postnom: postnom,
      prenom: prenom,
      // MongoDB stores ONLY Supabase URLs
      documentUrl: documentUrls,
    });

    await newPosts.save();

    res.status(200).json({
      message: "success",
      post: newPosts,
    });
  } catch (error) {
    console.error("Post document error:", error);

    res.status(500).json({
      message: "Error s'est produite",
      error: error.message,
    });
  }
};

// GET ALL DOCUMENTS
const getDocuments = async (req, res) => {
  try {
    const posts = await Posts.find({});

    if (posts && posts.length > 0) {
      return res.status(200).json({ success: true, post: posts });
    }

    res.status(404).json({
      success: false,
      message: "Aucun document trouve!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error s'est produite",
      error: error.message,
    });
  }
};

// EDIT DOCUMENT
const editDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const editDocuments = req.body;

    // Fixed: you were passing editDocument (the function itself)
    // instead of editDocuments (the request body)
    const documents = await Posts.findByIdAndUpdate(
      id,
      editDocuments,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!documents) {
      return res
        .status(404)
        .json({ message: "Aucun document trouve avec cet Id" });
    }

    res.status(200).json({
      success: true,
      post: documents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error s'est produite",
      error: error.message,
    });
  }
};

// DELETE DOCUMENT
const deletePosts = async (req, res) => {
  const { id } = req.params;

  try {
    const postsDelete = await Posts.findByIdAndDelete(id);

    if (!postsDelete) {
      return res
        .status(404)
        .json({ message: "Aucun document trouve avec cet Id" });
    }

    res.status(200).json({
      success: true,
      message: "Le document supprimee Avec success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error s'est produite",
      error: error.message,
    });
  }
};

// GET DOCUMENT BY ID
const getDocumentByID = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Posts.findById(id);

    if (posts) {
      return res.status(200).json({
        success: true,
        post: posts,
      });
    }

    res.status(404).json({
      success: false,
      message: "Aucun document trouve!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error s'est produite",
      error: error.message,
    });
  }
};

export {
  postDocument,
  getDocuments,
  editDocument,
  getDocumentByID,
  deletePosts,
};