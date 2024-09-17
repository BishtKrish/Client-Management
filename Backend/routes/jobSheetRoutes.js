import {Router} from 'express'
import { createJobSheet, deleteJobsheets, getJobSheetById, getJobSheets, updatejobSheets } from '../controllers/jobSheetController.js'

const router = Router()

router.route("/create").post(createJobSheet)

router.route("/get").get(getJobSheets)

router.route("/get/:id").get(getJobSheetById)

router.route("/delete/:id").delete(deleteJobsheets)

router.route("/update/:id").put(updatejobSheets)

export default router