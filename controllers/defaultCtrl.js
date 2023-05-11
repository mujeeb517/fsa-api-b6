function get(req, res) {
    res.status(200);
    res.send('hello express');
}

function health(req, res) {
    res.status(200);
    res.json({ status: 'Up' });
}

const notFound = (req, res) => {
    res.status(404);
    res.send('Not found!');
}

module.exports = {
    get,
    notFound,
    health
};