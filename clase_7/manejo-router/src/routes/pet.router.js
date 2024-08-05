import { Router } from "express";

const router = Router();

router.param("pet", (req, res, next, pet) => {
  // Validamos que el pet sea alfanumerico y puede contener espacios
  if (!/[a-zA-Z20%]+/.test(pet)) {
    return res.status(400).json({ message: "Pet invalido" });
  }

  const petExists = pets.find((p) => {
    return p.name === pet;
  });

  if (!petExists) {
    return res.status(404).json({ message: "Pet no encontrado" });
  }

  req.pet = petExists;

  next();
});

// DB
const pets = [
  {
    name: "Fido Dido",
    specie: "dog",
  },
  {
    name: "Rex",
    specie: "cat",
  },
  {
    name: "Bella",
    specie: "bird",
  },
  {
    name: "Charlie",
    specie: "fish",
  },
];

router.post("/", (req, res) => {
  const { name, specie } = req.body;

  if (!name || !specie) {
    return res.status(400).json({ message: "Falta información" });
  }

  pets.push({ name, specie });

  res.json({ message: "Pet created" });
});

router.get("/:pet", (req, res) => {
  res.json({ pet: req.pet });
});

router.put("/:pet([a-zA-Z20%]+)", (req, res) => {
  const newPet = { ...req.pet, adopted: true };

  const index = pets.findIndex((pet) => pet.name === req.params.pet);

  pets[index] = newPet;

  res.json({ message: "Pet updated" });
});

export default router;
