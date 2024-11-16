const router = require("express").Router();

const alunosRouter = require("./alunosRoute");

router.use("/",alunosRouter);

module.exports = router;