import { pool } from '../../../mysql';
import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express';

class VideoRepository {
  create(request: Request, response: Response){

    const {title, description, user_id, thumbnail, publishedAt} = request.body;

    pool.getConnection((err: any, connection: any) => {

      connection.query(

        'INSERT INTO videos (video_id, user_id, title, description, thumbnail, publishedAt) VALUES (?,?,?,?,?,?)',

        [uuidv4(), user_id, title, description, thumbnail, publishedAt],
        
        (error: any, result: any, filds: any) => {
          connection.release();

          if (error) {
            return response.status(400).json(error);
          }

          response.status(200).json({message: "video criado com sucesso"});
        }
      ) 
    })
  }

  getVideos(request: Request, response: Response){

    const {user_id} = request.query;

    pool.getConnection((err: any, connection: any) => {

      connection.query(

        'SELECT * FROM videos WHERE user_id = ?',
        [user_id],

        (error: any, results: any, filds: any) => {
          
          connection.release();

          if (error) {
            return response.status(400).json({error: "Erro ao buscar os vídeos"});
          }

          return response.status(200).json({message: "Videos retornados com sucesso", videos: results});
        }
      )
    })
  }

  searchVideos(request: Request, response: Response){

    const {search} = request.query;

    pool.getConnection((err: any, connection: any) => {

      connection.query(

        'SELECT * FROM videos WHERE title LIKE ? OR description LIKE ?',
        [`%${search}%`, `%${search}%`],

        (error: any, results: any, filds: any) => {
          
          connection.release();

          if (error) {
            return response.status(400).json({error: "Erro ao buscar os vídeos"});
          }

          return response.status(200).json({message: "Videos retornados com sucesso", videos: results});
        }
      )
    })
  }
}

export { VideoRepository };