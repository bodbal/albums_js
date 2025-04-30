import express from "express"
import  * as albumControllers from "../controllers/controller.js"

const router =express.Router()

router.get('/', albumControllers.getAlbum)
router.get('/:id', albumControllers.getAlbumById)
router.post('/', albumControllers.createAlbum)
router.put('/:id',albumControllers.updateAlbum)
router.delete('/:id', albumControllers.deleteAlbum)

export default router