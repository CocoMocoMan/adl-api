module.exports = function normalizeDateTime (datetime) {
    return datetime.toISOString().slice(0, 19).replace('T', ' ');
}