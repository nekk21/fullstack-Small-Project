import { Body, Req } from '@nestjs/common'
import { extname } from 'path'

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false)
    }
    callback(null, true)
}

export const editFileName = (req, file, callback) => {
    const fileExtName = extname(file.originalname)
    const random1 = Math.round(Math.random() * 1000)
    const random2 = Math.round(Math.random() * 1000)
    callback(null, `./avatar/${req.user.id}-${random1}${random2}${fileExtName}`)
}

export const editFileNameAdmin = (req, file, callback) => {
    const fileExtName = extname(file.originalname)
    const random1 = Math.round(Math.random() * 1000)
    const random2 = Math.round(Math.random() * 1000)
    callback(null, `./avatar/${req.user.id}-${random1}${random2}${fileExtName}`)
}

export const editLogoName = (req, file, callback) => {
    const fileExtName = extname(file.originalname)
    const random1 = Math.round(Math.random() * 1000)
    const random2 = Math.round(Math.random() * 1000)
    callback(null, `./logo/${req.user.id}-${random1}${random2}${fileExtName}`)
}
