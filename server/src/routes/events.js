const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const event = await prisma.event.create({
    data: { ...req.body, date: new Date(req.body.date) }
  });
  res.status(201).json(event);
});

router.get('/', async (req, res) => {
  const events = await prisma.event.findMany();
  res.json(events);
});

router.get('/:id', async (req, res) => {
  const event = await prisma.event.findUnique({ where: { id: Number(req.params.id) } });
  if (!event) return res.status(404).json({ error: 'Événement non trouvé' });
  res.json(event);
});

router.put('/:id', async (req, res) => {
  const event = await prisma.event.update({
    where: { id: Number(req.params.id) },
    data: req.body.date ? { ...req.body, date: new Date(req.body.date) } : req.body
  });
  res.json(event);
});

router.delete('/:id', async (req, res) => {
  await prisma.event.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

module.exports = router;