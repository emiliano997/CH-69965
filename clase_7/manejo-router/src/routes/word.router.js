import { Router } from "express";

const router = Router();

const words = ["hello", "world", "how", "are", "you"];
const languages = ["EN-us", "ES-es", "FR-fr", "ES-ar"];

router.param("word", (req, res, next, word) => {
  // Validar que sea una palabra en minúsculas y letras
  if (!/[a-zA-Z]+/.test(word)) {
    return res.status(400).json({ message: "Invalid word" });
  }

  const searchWord = words.find((w) => word.toLowerCase() === w);

  if (!searchWord) {
    return res.status(404).json({ message: "Word not found" });
  }

  req.word = searchWord;

  next();
});

router.param("language", (req, res, next, language) => {
  const searchLanguage = languages.find((l) => language === l);

  if (!searchLanguage) {
    return res.status(404).json({ message: "Language not found" });
  }

  req.language = searchLanguage;
  next();
});

// Ejemplo para el ECommerce
// cart.router.js
// router.param("productId", async (req, res, next, productId) => {
//   try {
//     const product = await productModel.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     next();
//   } catch (error) {
//     return res.status(500).json({ message: "Hubo un error" });
//   }
// });

router.get("/languages/:language", (req, res) => {
  res.json({ language: req.params.language });
});

router.get("/:word", (req, res) => {
  res.json({ word: req.params.word });
});

router.get("/:word/:language", (req, res) => {
  res.json({ word: req.params.word, language: req.params.language });
});

export default router;
