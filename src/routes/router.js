const router = require("express").Router();

const alunosRouter = require("./alunosRoute");
const profissionaisRouter = require("./profissionaisRoute");

router.use("/",alunosRouter);
router.use("/",profissionaisRouter);

module.exports = router;