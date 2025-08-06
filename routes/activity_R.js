const express = require('express');
const router = express.Router();

// בדיקה פשוטה שהראוטר עובד
router.get('/list', (req, res) => {
    res.send("רשימת המשימות תופיע כאן בהמשך");
});

module.exports = router;
