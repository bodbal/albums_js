import albums from "../data/movies.js"
export const getAlbum= (req,res)=> {
    res.status(200).json(albums)

}
export const getAllbumById=  (req,res)=> {
    const id= req.params.id
    if (id<0 || id >= albums.length){
        return res.status(404).json({message:"Album not found" })
    }
    res.status(200).json(albums)

}

export const createAlbum= (req,res)=> {
    const {cim, zenekar, ev, mufaj}=req.body
    if(!cim || !zenekar || !ev || !mufaj){
        return res.status(404).json({message: "Missing data"})
    }
    const newAlbum={im, zenekar, ev, mufaj}
    albums.push(newAlbum)
    res.status(201).json(newAlbum)
}

export const updateAlbum =(req,res)=> {
    const id= req.params.id
    if (id<0 || id >= albums.length){
        return res.status(404).json({message:"Album not found" })
    }
    const {cim, zenekar, ev, mufaj}=req.body
    if(!cim || !zenekar || !ev || !mufaj){
        return res.status(404).json({message: "Missing data"})
    }
    albums[id]={cim, zenekar, ev, mufaj}
    res.status(200).json(albums[id])
}
export const deleteAlbum=  (req,res)=> {
    const id=req.params.id
    if (id <0 || id >= albums.length){
        return res.status(404).json({message:"Album not found"})
    }
    albums.splice(id, 1)
    res.status(200).json({message:"Delete successful"})
}