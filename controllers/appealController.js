const Appeal = require('../models/appeal');

const createAppeal = async (req, res) => {
    try {
        const { subject, text } = req.body;
        const newAppeal = await Appeal.create({ subject, text });
        res.status(201).json(newAppeal);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании обращения' });
    }
};

const takeAppeal = async (req, res) => {
    try {
        const { id } = req.params;
        const appeal = await Appeal.updateStatus(id, 'В работе');
        res.status(200).json(appeal);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при изменении статуса' });
    }
};

const finishAppeal = async (req, res) => {
    try {
        const { id } = req.params;
        const { solution } = req.body;
        console.log('Полученные данные для завершения:', { solution });
        if (!solution) {
            return res.status(400).json({ error: 'Решение обязательно для завершения обращения' });
        }
        const appeal = await Appeal.updateStatus(id, 'Завершено', solution);
        console.log('Обновленное обращение после завершения:', appeal);
        res.status(200).json(appeal);
    } catch (error) {
        console.error('Ошибка при завершении обращения:', error);
        res.status(500).json({ error: 'Ошибка при завершении обращения' });
    }
};

const cancelAppeal = async (req, res) => {
    try {
        const { id } = req.params;
        const { cancelReason } = req.body;
        console.log("Данные, полученные для отмены:", req.body);
        const appeal = await Appeal.updateStatus(id, 'Отменено', null, cancelReason);
        console.log("Обновленное обращение:", appeal);
        res.status(200).json(appeal);
    } catch (error) {
        console.error("Ошибка при отмене обращения:", error);
        res.status(500).json({ error: 'Ошибка при отмене обращения' });
    }
};

const getAppeals = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const appeals = await Appeal.getAll({ startDate, endDate });
        res.status(200).json(appeals);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении списка обращений' });
    }
};

const cancelAllInProgress = async (req, res) => {
    try {
        const appeals = await Appeal.cancelAllInProgress();
        res.status(200).json(appeals);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при отмене всех обращений в работе' });
    }
};

module.exports = { createAppeal, takeAppeal, finishAppeal, cancelAppeal, getAppeals, cancelAllInProgress };