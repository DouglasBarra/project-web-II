const router = require("express").Router();

const alunosRouter = require("./alunosRoute");
const profissionaisRouter = require("./profissionaisRoute");
const AgendamentoRouter = require("./agendamentosRoute");

router.use("/", alunosRouter);
router.use("/", profissionaisRouter);
router.use("/", AgendamentoRouter)

module.exports = router;