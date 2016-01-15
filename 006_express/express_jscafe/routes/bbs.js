var messages = [];
express.bbs = function (req, res) {
    var message = req.body.message;
    if (message) {
        messages.push(message);
    }
    res.render('bbs', { title: 'JSCafe', messages: messages });
};

