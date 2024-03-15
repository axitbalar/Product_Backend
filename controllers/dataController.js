const data = require("../json/json")


const getData = async (req, res) => {
    try {
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

module.exports = {
    getData
}