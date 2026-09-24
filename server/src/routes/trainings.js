const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const training = await prisma.training.create({ data: req.body });
  res.status(201).json(training);
});

router.get('/', async (req, res) => {
  const trainings = await prisma.training.findMany();
  res.json(trainings);
});

router.get('/:id', async (req, res) => {
  const training = await prisma.training.findUnique({ where: { id: Number(req.params.id) } });
  if (!training) return res.status(404).json({ error: 'Formation non trouvée' });
  res.json(training);
});

router.put('/:id', async (req, res) => {
  const training = await prisma.training.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(training);
});

router.delete('/:id', async (req, res) => {
  await prisma.training.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

module.exports = router;